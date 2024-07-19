import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      isActive: boolean;
    };
  }
  interface User extends DefaultUser {
    isActive: boolean;
  }
}
