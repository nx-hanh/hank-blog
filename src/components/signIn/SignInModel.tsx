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
}

export default function SignInModel({ providers }: SignInModelProps) {
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
