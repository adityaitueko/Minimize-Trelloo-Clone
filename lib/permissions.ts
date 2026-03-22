import { prisma } from "./prisma";

export type Role = "owner" | "developer" | "reviewer" | "tester";

export const ROLES: Record<Role, { label: string; description: string }> = {
  owner: {
    label: "Owner",
    description: "Full access to all project features",
  },
  developer: {
    label: "Developer",
    description: "Can create and edit tasks, move to Review",
  },
  reviewer: {
    label: "Reviewer",
    description: "Can approve/reject reviews, move tasks to Done",
  },
  tester: {
    label: "Tester",
    description: "Can view tasks and move to Review",
  },
};

export const ROLE_COLORS: Record<Role, string> = {
  owner: "bg-amber-500 text-white",
  developer: "bg-blue-500 text-white",
  reviewer: "bg-purple-500 text-white",
  tester: "bg-green-500 text-white",
};

// Check if user can create tasks
export function canCreateTask(role: Role): boolean {
  return ["owner", "developer"].includes(role);
}

// Check if user can edit a specific task
export function canEditTask(role: Role, isAssignee: boolean): boolean {
  if (role === "owner") return true;
  if (role === "developer" && isAssignee) return true;
  return false;
}

// Check if user can delete a task
export function canDeleteTask(role: Role, isAssignee: boolean): boolean {
  if (role === "owner") return true;
  if (role === "developer" && isAssignee) return true;
  return false;
}

// Check if user can move task to specific status
export function canMoveToStatus(role: Role, targetStatus: string): boolean {
  switch (targetStatus) {
    case "todo":
    case "in-progress":
    case "review":
      return ["owner", "developer", "reviewer", "tester"].includes(role);
    case "done":
      return ["owner", "reviewer"].includes(role);
    default:
      return false;
  }
}

// Check if user can approve/reject reviews
export function canReview(role: Role): boolean {
  return ["owner", "reviewer"].includes(role);
}

// Check if user can manage members (invite, change roles, remove)
export function canManageMembers(role: Role): boolean {
  return role === "owner";
}

// Check if user can delete the project
export function canDeleteProject(role: Role): boolean {
  return role === "owner";
}

// Check if user can edit project settings
export function canEditProjectSettings(role: Role): boolean {
  return role === "owner";
}

// Get user's role in a project
export async function getUserRole(
  userId: string,
  projectId: string
): Promise<Role | null> {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });

  return (membership?.role as Role) || null;
}

// Get all members with roles for a project
export async function getProjectMembers(projectId: string) {
  return prisma.membership.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: [
      { role: "asc" }, // owner first
      { createdAt: "asc" },
    ],
  });
}

// Update member role
export async function updateMemberRole(
  userId: string,
  projectId: string,
  newRole: Role
) {
  return prisma.membership.update({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
    data: { role: newRole },
  });
}

// Remove member from project
export async function removeMember(userId: string, projectId: string) {
  return prisma.membership.delete({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
}

// Invite member to project
export async function inviteMember(
  email: string,
  projectId: string,
  role: Role
) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if already a member
  const existingMembership = await prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId: user.id,
        projectId,
      },
    },
  });

  if (existingMembership) {
    throw new Error("User is already a member of this project");
  }

  return prisma.membership.create({
    data: {
      userId: user.id,
      projectId,
      role,
    },
  });
}

// Create notification
export async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  projectId?: string
) {
  return prisma.notification.create({
    data: {
      userId,
      projectId,
      type,
      title,
      message,
    },
  });
}

// Get user notifications
export async function getUserNotifications(userId: string, limit = 50) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// Mark notification as read
export async function markNotificationRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
}

// Mark all notifications as read for a user
export async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}
