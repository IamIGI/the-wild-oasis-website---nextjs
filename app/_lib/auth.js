import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      return Boolean(auth?.user);
    },
    async signIn({ user, account, profile }) {
      //runs before signin process

      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        return true;
      } catch (error) {
        return false;
      }
    },

    async session({ session }) {
      //run every time session get checked
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;

      return session;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
