// app/api/tasks/[taskId]/route.ts
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  // 1. Verifikasi session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Ambil body (bisa berisi banyak field untuk update)
  const body = await req.json();
  const { status, title, description, assigneeId, checkItems } = body;

  // 3. Temukan task dan project-nya
  const task = await prisma.task.findUnique({
    where: { id: params.taskId },
    include: { project: { include: { members: true } } },
  });
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  // 4. Cek akses: harus owner atau member project
  const project = task.project;
  const isOwner = project.ownerId === userId;
  const isMember = project.members.some(m => m.userId === userId);
  if (!isOwner && !isMember) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // 5. Update task fields
  try {
    const data: any = {};
    if (typeof title === 'string') data.title = title;
    if (typeof description === 'string') data.description = description;
    if (typeof status === 'string') data.status = status;
    if (typeof assigneeId === 'string' || assigneeId === null) data.assigneeId = assigneeId;

    const updated = await prisma.task.update({
      where: { id: params.taskId },
      data,
      include: { checkItems: true },
    });

    // If checkItems provided, replace existing items
    if (Array.isArray(checkItems)) {
      await prisma.taskCheckItem.deleteMany({ where: { taskId: params.taskId } });
      if (checkItems.length > 0) {
        await prisma.taskCheckItem.createMany({
          data: checkItems.map((c: any, idx: number) => ({
            taskId: params.taskId,
            text: String(c.text || ''),
            completed: Boolean(c.completed || false),
            order: typeof c.order === 'number' ? c.order : idx,
          })),
        });
      }
    }

    const refreshed = await prisma.task.findUnique({
      where: { id: params.taskId },
      include: {
        checkItems: { orderBy: { order: 'asc' } },
        project: { include: { members: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(refreshed);
  } catch (err: unknown) {
    console.error('Failed to update task status:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
