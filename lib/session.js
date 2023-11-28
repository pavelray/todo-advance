import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

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
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
    async jwt({ session, token, user }) {
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        return true;
      } catch (err) {
        if (err) {
          return false;
        }
      }
    }
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
