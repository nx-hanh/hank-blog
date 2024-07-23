import React, { FC } from 'react';
import Image from 'next/image';
import { User } from 'next-auth';

import imageSrc from '@/assets/images/logo.jpg';
import { LanguageSwitcher } from '@/components/navbar/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from '@/lib/i18n';

interface ActionsFloatButtonProps {
  user?: User;
}

const ActionsFloatButton: FC<ActionsFloatButtonProps> = ({ user }) => {
  return (
    <div className="fixed bottom-10 right-20 z-50">
      <Popover>
        <PopoverTrigger>
          <div className="bg-foreground flex size-14 cursor-pointer items-center justify-center rounded-full p-1 shadow-lg">
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
              <Link
                href="/dashboard"
                className="border-foreground bg-background size-12 rounded-full border-[3px]"
              >
                User
              </Link>
            ) : null}
            <LanguageSwitcher />
            <ThemeSwitcher className="border-foreground bg-background size-12 rounded-full border-[3px]" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionsFloatButton;
