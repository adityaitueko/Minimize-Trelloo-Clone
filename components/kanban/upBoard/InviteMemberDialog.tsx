'use client';

import React, { useState, useEffect } from 'react';
import Autosuggest, { Suggestion } from '@/components/ui/autosuggest';
import { useDebounce } from '@uidotdev/usehooks';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import { ROLES, ROLE_COLORS, type Role } from '@/lib/permissions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type User = { id: string; name: string; email: string };

interface InviteMemberDialogProps {
  boardId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function RoleSelector({ currentRole, onRoleChange }: { currentRole: Role; onRoleChange: (role: Role) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <span className={cn(
              "w-2 h-2 rounded-full",
              ROLE_COLORS[currentRole].split(" ")[0]
            )} />
            {ROLES[currentRole].label}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        {(Object.keys(ROLES) as Role[]).map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onRoleChange(role)}
            className={cn(
              currentRole === role && "bg-muted"
            )}
          >
            <span className={cn(
              "w-2 h-2 rounded-full mr-2",
              ROLE_COLORS[role].split(" ")[0]
            )} />
            <div>
              <p className="font-medium">{ROLES[role].label}</p>
              <p className="text-xs text-muted-foreground">
                {ROLES[role].description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function InviteMemberDialog({
  boardId,
  open,
  setOpen
}: InviteMemberDialogProps) {
    const router = useRouter();
  const [value, setValue] = useState('');
  const [rawQuery, setRawQuery] = useState('');
  const debouncedQuery = useDebounce(rawQuery, 300);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('developer');
  const addUser = useUserStore((state) => state.addUser);

  useEffect(() => {
    async function fetchSuggestions() {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
        const users: User[] = await res.json();
        setSuggestions(users.map(u => ({
          id: u.id,
          name: u.name || u.email,
          email: u.email
        })));
      } catch {
        setSuggestions([]);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery]);

  const onChange = (_: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setValue(newValue);
    setRawQuery(newValue);
    setSelected(null);
  };

  const onSuggestionsFetchRequested = () => {};
  const onSuggestionsClearRequested = () => setSuggestions([]);
  const getSuggestionValue = (s: Suggestion) => s.name;
  const renderSuggestion = (s: Suggestion) => (
    <div className="px-2 py-2">
      <div className="font-medium">{s.name}</div>
      <div className="text-sm text-gray-500">{s.email}</div>
    </div>
  );

  const onSuggestionSelected = (_: React.FormEvent<HTMLElement>, { suggestion }: { suggestion: Suggestion }) => {
    setSelected(suggestion);
    setValue(suggestion.name);
  };

  const handleInvite = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${boardId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selected.email, role: selectedRole }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Invite gagal');
      }

      addUser(selected);
      toast.success(`${selected.name} invited as ${ROLES[selectedRole].label}!`);

      router.refresh();
      setOpen(false);
      
      setValue('');
      setRawQuery('');
      setSelected(null);
      setSelectedRole('developer');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{/* tombol trigger */}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>Search and invite by name or email</DialogDescription>
        </DialogHeader>

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={{
            placeholder: 'Search name or email...',
            value,
            onChange,
          }}
          theme={{
            container: 'relative',
            suggestionsContainer:
              'absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg overflow-auto',
            suggestion: 'cursor-pointer',
            suggestionHighlighted: 'bg-blue-50',
          }}
        />

        {selected && (
          <div className="border rounded-lg p-3 bg-gray-50 mt-3">
            <div className="font-medium">Selected:</div>
            <div>{selected.name}</div>
            <div className="text-sm text-gray-600">{selected.email}</div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <RoleSelector currentRole={selectedRole} onRoleChange={setSelectedRole} />
          <p className="text-xs text-muted-foreground">
            {ROLES[selectedRole].description}
          </p>
        </div>

        <Button
          onClick={handleInvite}
          disabled={loading || !selected}
          className="mt-4"
        >
          {loading ? 'Adding…' : `Add as ${ROLES[selectedRole].label}`}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
