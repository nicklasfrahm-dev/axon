import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  trustHost: true,
  callbacks: {
    jwt({ token, user }) {
      // TODO: Extend the JWT to include the accessToken.

      return token;
    },
    session({ session, token }) {
      // TODO: Extend the session to include the accessToken.

      return session;
    },
  },
});
