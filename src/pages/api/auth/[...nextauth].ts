import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    // async session({ session, token }) {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //       randomKey: token.randomKey
    //     }
    //   };
    // },
    async session({ session, token }: any) {
      session.user.username = session?.user?.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        };
      }
      return token;
    }
  },
  secret: process.env.NEXT_PUBLIC_SECRET
};

export default NextAuth(authOption);
