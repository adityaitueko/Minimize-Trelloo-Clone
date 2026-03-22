import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: dev ? `http://${hostname}:${port}` : process.env.NEXTAUTH_URL,
      methods: ["GET", "POST"],
    },
  });

  // Store online users per project
  const projectUsers = new Map<string, Set<string>>();

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a project room
    socket.on("join-project", (projectId: string, userId: string) => {
      socket.join(`project:${projectId}`);

      if (!projectUsers.has(projectId)) {
        projectUsers.set(projectId, new Set());
      }
      projectUsers.get(projectId)?.add(userId);

      // Notify others in the project
      socket.to(`project:${projectId}`).emit("member-joined", {
        userId,
        socketId: socket.id,
      });

      // Send online users to the joining user
      const onlineUsers = Array.from(projectUsers.get(projectId) || []);
      socket.emit("online-users", onlineUsers);

      console.log(`User ${userId} joined project ${projectId}`);
    });

    // Leave a project room
    socket.on("leave-project", (projectId: string, userId: string) => {
      socket.leave(`project:${projectId}`);

      projectUsers.get(projectId)?.delete(userId);

      socket.to(`project:${projectId}`).emit("member-left", {
        userId,
        socketId: socket.id,
      });

      console.log(`User ${userId} left project ${projectId}`);
    });

    // Task moved event
    socket.on("task-moved", (data: { projectId: string; taskId: string; newStatus: string; userId: string }) => {
      socket.to(`project:${data.projectId}`).emit("task-moved", {
        taskId: data.taskId,
        newStatus: data.newStatus,
        userId: data.userId,
      });
    });

    // Task created event
    socket.on("task-created", (data: { projectId: string; task: any; userId: string }) => {
      socket.to(`project:${data.projectId}`).emit("task-created", {
        task: data.task,
        userId: data.userId,
      });
    });

    // Task updated event
    socket.on("task-updated", (data: { projectId: string; task: any; userId: string }) => {
      socket.to(`project:${data.projectId}`).emit("task-updated", {
        task: data.task,
        userId: data.userId,
      });
    });

    // Task deleted event
    socket.on("task-deleted", (data: { projectId: string; taskId: string; userId: string }) => {
      socket.to(`project:${data.projectId}`).emit("task-deleted", {
        taskId: data.taskId,
        userId: data.userId,
      });
    });

    // Review requested event
    socket.on("review-requested", (data: { projectId: string; taskId: string; reviewerId: string; requestedBy: string }) => {
      socket.to(`project:${data.projectId}`).emit("review-requested", {
        taskId: data.taskId,
        reviewerId: data.reviewerId,
        requestedBy: data.requestedBy,
      });
    });

    // Review completed event
    socket.on("review-completed", (data: { projectId: string; taskId: string; status: string; reviewedBy: string }) => {
      socket.to(`project:${data.projectId}`).emit("review-completed", {
        taskId: data.taskId,
        status: data.status,
        reviewedBy: data.reviewedBy,
      });
    });

    // Notification event
    socket.on("notification", (data: { userId: string; notification: any }) => {
      // Send to specific user if they're online
      io.to(`user:${data.userId}`).emit("notification", data.notification);
    });

    // Join user room for personal notifications
    socket.on("join-user", (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined personal room`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
