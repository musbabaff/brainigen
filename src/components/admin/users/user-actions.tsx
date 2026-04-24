'use client';

import { useState } from 'react';
import { MoreHorizontal, Shield, CreditCard, Ban, Trash2 } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type UserLike = { id: string; banned: boolean | null };

export function UserActions({ user }: { user: UserLike }) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={loading}
        className="w-9 h-9 rounded-md border border-border hover:bg-surface-2 flex items-center justify-center disabled:opacity-50"
      >
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => handleAction('change_role')} className="cursor-pointer">
          <Shield className="w-4 h-4 mr-2" />
          Change Role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('change_plan')} className="cursor-pointer">
          <CreditCard className="w-4 h-4 mr-2" />
          Change Plan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.banned ? (
          <DropdownMenuItem onClick={() => handleAction('unban')} className="cursor-pointer text-success">
            <Ban className="w-4 h-4 mr-2" />
            Unban User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleAction('ban')} className="cursor-pointer text-danger">
            <Ban className="w-4 h-4 mr-2" />
            Ban User
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleAction('delete')} className="cursor-pointer text-danger">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
