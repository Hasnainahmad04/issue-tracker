import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import prisma from './prisma/client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  adapter: PrismaAdapter(prisma),
  pages: { signIn: '/sign-in' },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: async () => true,
    jwt({ token, user }) {
      const clone = { ...token };
      if (user) {
        clone.id = user.id;
      }
      return clone;
    },
    session({ session, token }) {
      const clone = { ...session, user: { ...session.user } };
      clone.user.id = token.id as string;
      return clone;
    },
  },
});
