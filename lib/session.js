import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { createUser, getUser } from "./actions";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRECT,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token, secret);
      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session, token, user }) {
      const email = session?.user?.email;
      try {
        const data = await getUser(email);
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (err) {
        console.log(err);
        return session;
      }
    },
    async jwt({ session, token, user }) {
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log(user);
        const userExsists = await getUser(user.email);
        if (!userExsists.user) {
          await createUser(user.name, user.email, user.image);
        }
        return true;
      } catch (err) {
        if (err) {
          console.log(err);
          return false;
        }
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
