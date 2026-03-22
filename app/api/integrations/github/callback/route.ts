import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/dashboard?github_error=${error}`, req.url)
      );
    }

    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }

    // Decode state to get userId
    let userId: string;
    try {
      const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
      userId = stateData.userId;
    } catch {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
    }

    // Exchange code for access token
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/integrations/github/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub token error:', tokenData.error_description);
      return NextResponse.redirect(
        new URL(`/dashboard?github_error=token_failed`, req.url)
      );
    }

    // Store connection in database
    await prisma.repositoryConnection.upsert({
      where: {
        userId_provider: {
          userId,
          provider: 'github',
        },
      },
      update: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || null,
        scope: tokenData.scope || 'repo read:user',
      },
      create: {
        userId,
        provider: 'github',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || null,
        scope: tokenData.scope || 'repo read:user',
      },
    });

    // Redirect back to dashboard with success
    return NextResponse.redirect(
      new URL('/dashboard?github_connected=true', req.url)
    );
  } catch (error) {
    console.error('GitHub callback error:', error);
    return NextResponse.redirect(
      new URL('/dashboard?github_error=callback_failed', req.url)
    );
  }
}
