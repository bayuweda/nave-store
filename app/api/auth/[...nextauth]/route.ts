import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          credentials?.email === "admin@email.com" &&
          credentials?.password === "admin123"
        ) {
          return { id: "1", name: "Admin" };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
