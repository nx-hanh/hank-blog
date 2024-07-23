import React, { FC } from 'react';

import SocialLoginButton from '@/components/signIn/SocialLoginButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SignInModelProps {}

const SignInModel: FC<SignInModelProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-2 cursor-pointer text-lg font-semibold tracking-wide">
          Sign In
        </span>
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
          <SocialLoginButton type="Google" text="Sign in with Google" />
          <SocialLoginButton type="Facebook" text="Sign in with Facebook" />
          <SocialLoginButton type="Github" text="Sign in with Github" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModel;
