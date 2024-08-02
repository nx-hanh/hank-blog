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
import { ADMIN_EMAIL } from '@/lib/constant';
import { Link } from '@/lib/i18n';

interface UserActionsButtonProps {
  imageSrc: string;
  name: string;
  id: string;
  email: string;
}

const UserActionsButton: FC<UserActionsButtonProps> = ({
  imageSrc,
  name,
  id,
  email,
}) => {
  const isAmin = email === ADMIN_EMAIL ? true : false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-background size-12 cursor-pointer rounded-full border-[3px] border-black hover:opacity-75 dark:border-gray-700">
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
        {isAmin && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/admin" className="w-full">
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/history/${id}`} className="w-full">
            History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="h-fit w-full cursor-pointer justify-start p-2"
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
