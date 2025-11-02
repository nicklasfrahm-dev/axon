import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt({ token, user }) {
      // User is available during sign-in.
      if (user) {
        console.log("User signed in:", user);
      }

      return token;
    },
    session({ session, token }) {
      // TODO: Extend the session to include the accessToken.

      return session;
    },
  },
});
