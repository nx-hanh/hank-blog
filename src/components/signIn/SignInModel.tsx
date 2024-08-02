'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';

import SocialLoginButton from '@/components/signIn/SocialLoginButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SignInModelProps {
  providers: ClientSafeProvider[];
  type?: 'text' | 'icon';
}

export default function SignInModel({
  providers,
  type = 'text',
}: SignInModelProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === 'icon' ? (
          <div className="bg-background flex size-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-black pl-1 hover:bg-gray-500/75 hover:opacity-80 dark:border-gray-700 dark:hover:bg-gray-800/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              enableBackground="new 0 0 28 28"
              viewBox="0 0 28 28"
              className="fill-foreground"
            >
              <g fillRule="evenodd">
                <path
                  d="M11.55.815a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm4.169 11.275c.485-.55 1.199-.9 1.993-.9h1.908a2.658 2.658 0 012.658 2.659v6.678a2.658 2.658 0 01-2.658 2.658h-1.908c-.794 0-1.508-.35-1.993-.9a.75.75 0 111.124-.992c.213.241.523.392.869.392h1.908c.64 0 1.158-.519 1.158-1.158v-6.678c0-.64-.518-1.159-1.158-1.159h-1.908c-.346 0-.656.151-.869.393a.75.75 0 01-1.125-.993z"
                  data-original="#ffffff"
                ></path>
                <path
                  d="M17.935 16.657a.75.75 0 010 1.06l-2 2a.75.75 0 01-1.061-1.06l2-2a.75.75 0 011.06 0z"
                  data-original="#ffffff"
                ></path>
                <path
                  d="M17.935 17.718a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.061 1.06l2 2a.75.75 0 001.06 0z"
                  data-original="#ffffff"
                ></path>
                <path
                  d="M11.154 17.188a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75z"
                  data-original="#ffffff"
                ></path>
              </g>
              <path
                d="M13.788 13.622a18.9 18.9 0 00-11.17 2.07c-.542.288-.88.85-.88 1.464v3.672c0 .966.783 1.75 1.75 1.75h10.685a2.258 2.258 0 01-.02-1.52 2.254 2.254 0 01-.985-1.62h-1.264a2.25 2.25 0 110-4.5h1.264a2.24 2.24 0 01.62-1.316z"
                data-original="#ffffff"
              ></path>
            </svg>
          </div>
        ) : (
          <span className="ml-2 cursor-pointer text-lg font-semibold tracking-wide">
            Sign In
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-400 ">
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <DialogTitle className="text-2xl font-semibold tracking-wide text-black">
            Login
          </DialogTitle>
          <DialogDescription className="dark:text-gray-800">
            Login to save your reading history, using your favorite social!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {providers.map((provider) => (
            <SocialLoginButton
              key={provider.id}
              type={provider.id}
              text={`Sign in with ${provider.name}`}
              onClick={() => signIn(provider.id)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
