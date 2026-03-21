"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBoards } from '@/hook/useBoard';

function initials(name?: string) {
  if (!name) return "--";
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function stringToHsl(str?: string) {
  const s = str || "";
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}deg 60% 40%)`;
}
const Sidebar = () => {
    const router = useRouter();
  const { boards, loading } = useBoards();
  return (
    <aside className="w-64 bg-zinc-950 flex flex-col px-4 py-6">
        <div className="text-2xl font-bold mb-8">Treeloo</div>
        <nav className="space-y-3">
          <Button variant="ghost" className="justify-start w-full text-left">Boards</Button>
          <Button onClick={()=>router.push('/dashboard')} variant="ghost" className="justify-start w-full text-left">Home</Button>
        </nav>
        <div className="mt-10">
          <div className="font-semibold mb-2 text-zinc-400">Workspaces</div>
          <ul className="space-y-2">
            {loading && (
              <li className="text-sm text-zinc-500">Loading...</li>
            )}

            {!loading && boards.length === 0 && (
              <li className="text-sm text-zinc-500">No workspaces yet</li>
            )}

            {!loading && boards.map((b: any) => (
              <li key={b.id}>
                <Link href={`/dashboard/${b.id}`} className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-zinc-800 transition-colors">
                  <Avatar className="h-7 w-7" style={{backgroundColor: stringToHsl(b.name)}}>
                    <AvatarFallback className="text-sm font-medium">{initials(b.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate max-w-[11rem]">{b.name}</span>
                </Link>
              </li>
            ))}

          </ul>
          <div className="mt-3">
            <Button variant="ghost" className="justify-start text-sm" onClick={() => router.push('/dashboard')}>View all</Button>
          </div>
        </div>
      </aside>
  )
}

export default Sidebar
