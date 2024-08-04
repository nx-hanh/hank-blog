import React, { FC } from 'react';
import Image from 'next/image';
import { getServerSession, User } from 'next-auth';
import { getProviders } from 'next-auth/react';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import imageSrc from '@/assets/images/logo.svg';
import HomeButton from '@/components/HomeButton';
// import { LanguageSwitcher } from '@/components/language-switcher';
import SignInModel from '@/components/signIn/SignInModel';
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
  const providers = await getProviders();
  const user = session?.user as User;
  const loginProviders = providers ? Object.values(providers) : [];
  return (
    <div className="fixed bottom-10 right-20 z-50">
      <Popover>
        <PopoverTrigger>
          <div className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-black p-1 shadow-lg hover:scale-105 dark:bg-gray-700">
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
            {user ? (
              <UserActionsButton
                imageSrc={user.image || ''}
                name={user.name || ''}
                id={user.id || ''}
                email={user.email || ''}
              />
            ) : (
              <SignInModel providers={loginProviders} type="icon" />
            )}
            {/* <LanguageSwitcher /> */}
            <ThemeSwitcher className="bg-background size-12 rounded-full  border-[3px] border-black hover:bg-gray-500/75 dark:border-gray-700 dark:hover:bg-gray-800/75" />
            <HomeButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionsFloatButton;
