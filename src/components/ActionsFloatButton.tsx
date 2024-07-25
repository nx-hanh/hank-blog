import React, { FC } from 'react';
import Image from 'next/image';
import { getServerSession, User } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import imageSrc from '@/assets/images/logo.jpg';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import UserActionsButton from '@/components/UserActionsButton';

interface ActionsFloatButtonProps {}

const ActionsFloatButton: FC<ActionsFloatButtonProps> = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  return (
    <div className="fixed bottom-10 right-20 z-50">
      <Popover>
        <PopoverTrigger>
          <div className="bg-foreground flex size-14 cursor-pointer items-center justify-center rounded-full p-1 shadow-lg hover:scale-105">
            <Image
              src={imageSrc}
              alt="More"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit border-none bg-transparent shadow-none">
          <div className="flex flex-col items-center justify-center gap-2 bg-transparent">
            {user && (
              <UserActionsButton
                imageSrc={user.image || ''}
                name={user.name || ''}
                id={user.id || ''}
              />
            )}
            <LanguageSwitcher />
            <ThemeSwitcher className="border-foreground bg-background size-12 rounded-full border-[3px]" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionsFloatButton;
