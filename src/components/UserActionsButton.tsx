'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/lib/i18n';

interface UserActionsButtonProps {
  imageSrc: string;
  name: string;
  id: string;
}

const UserActionsButton: FC<UserActionsButtonProps> = ({
  imageSrc,
  name,
  id,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-foreground bg-background size-12 cursor-pointer rounded-full border-[3px]">
          <Image
            src={imageSrc}
            alt="User"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="center" className="mr-2">
        <DropdownMenuLabel className="pointer-events-none gap-2">
          {name}
          <Separator />
        </DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer">
          <Link href={`/history/${id}`} className="w-full">
            History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="h-fit w-full justify-start p-0"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsButton;
