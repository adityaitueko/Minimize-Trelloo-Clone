// app/api/projects/route.ts
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(getAuthOptions());
  const userId = session?.user?.id;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, ownerId } = body;

  // Use the authenticated user's ID as owner
  const actualOwnerId = ownerId || userId;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        ownerId: actualOwnerId,
        // Create membership record for owner automatically
        members: {
          create: {
            userId: actualOwnerId,
            role: 'owner',
          },
        },
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}


export async function GET() {
  const session = await getServerSession(getAuthOptions());
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },                     // sebagai owner
          { members: { some: { userId: userId } } } // sebagai member
        ]
      },
      include: {
        owner: true,
        members: {
          select: {
            user: {
              select: { id: true, name: true, email: true }
            },
            role: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(projects);
  } catch (e) {
    console.error('Failed to fetch projects:', e);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
