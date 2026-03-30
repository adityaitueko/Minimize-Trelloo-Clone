"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLES, ROLE_COLORS, type Role } from "@/lib/permissions";
import { ChevronDown, UserPlus, Trash2, Loader2, Users, Settings as SettingsIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Member {
  id: string;
  userId: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Project {
  id: string;
  name: string;
  ownerId: string;
}

interface SettingsPanelProps {
  projectId: string;
  currentUserId: string;
  currentUserRole: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsPanel({
  projectId,
  currentUserId,
  currentUserRole,
  open,
  onOpenChange,
}: SettingsPanelProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState("");
  
  const isOwner = currentUserRole === "owner";

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, projectId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectRes, membersRes] = await Promise.all([
        fetch(`/api/projects/${projectId}`),
        fetch(`/api/members?projectId=${projectId}`),
      ]);
      
      const projectData = await projectRes.json();
      const membersData = await membersRes.json();
      
      setProject(projectData);
      setProjectName(projectData.name);
      setMembers(membersData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectNameUpdate = async () => {
    if (!projectName.trim() || projectName === project?.name) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName }),
      });

      if (!res.ok) throw new Error("Failed to update project name");
      
      setProject(prev => prev ? { ...prev, name: projectName } : null);
      toast.success("Project name updated");
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project name");
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: Role) => {
    if (!isOwner) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/members`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, userId, role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update role");
      }

      toast.success("Member role updated");
      fetchData();
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update role");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!isOwner) return;
    if (userId === currentUserId) {
      toast.error("You cannot remove yourself as the owner");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `/api/members?projectId=${projectId}&userId=${userId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove member");
      }

      toast.success("Member removed");
      fetchData();
    } catch (error) {
      console.error("Failed to remove member:", error);
      toast.error(error instanceof Error ? error.message : "Failed to remove member");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Project Settings
          </DialogTitle>
          <DialogDescription>
            Manage your project members and settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="members" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              Members ({members.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          {isOwner && (
            <div className="flex justify-end mt-2">
              <Button
                size="sm"
                className="gap-2"
                onClick={() => {
                  onOpenChange(false);
                  // Dispatch event to open InviteMemberDialog
                  window.dispatchEvent(new CustomEvent('openInviteDialog'));
                }}
              >
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </div>
          )}

          <TabsContent value="members" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn(
                            "text-sm font-medium",
                            ROLE_COLORS[member.role as Role] || "bg-muted"
                          )}>
                            {getInitials(member.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {member.user.name || "Unnamed"}
                            {member.userId === currentUserId && (
                              <span className="text-muted-foreground ml-1">(You)</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{member.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            ROLE_COLORS[member.role as Role]
                          )}
                        >
                          {ROLES[member.role as Role]?.label || member.role}
                        </span>
                        {isOwner && member.userId !== currentUserId && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {(Object.keys(ROLES) as Role[]).map((role) => (
                                <DropdownMenuItem
                                  key={role}
                                  onClick={() => handleRoleChange(member.userId, role)}
                                  disabled={member.role === role || saving}
                                  className={cn(
                                    member.role === role && "bg-muted"
                                  )}
                                >
                                  <span className={cn(
                                    "w-2 h-2 rounded-full mr-2",
                                    ROLE_COLORS[role].split(" ")[0]
                                  )} />
                                  {ROLES[role].label}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuItem
                                onClick={() => handleRemoveMember(member.userId)}
                                className="text-destructive focus:text-destructive"
                                disabled={saving}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-4">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        disabled={!isOwner}
                        placeholder="Project name"
                      />
                      {isOwner && (
                        <Button 
                          onClick={handleProjectNameUpdate} 
                          disabled={saving || projectName === project?.name}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                        </Button>
                      )}
                    </div>
                    {!isOwner && (
                      <p className="text-xs text-muted-foreground">
                        Only the project owner can edit the project name
                      </p>
                    )}
                  </div>
                </div>

                {isOwner && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <h4 className="font-medium text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Danger Zone
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Once you delete a project, there is no going back. Please be certain.
                      </p>
                    </div>
                    <Button variant="destructive" disabled>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
