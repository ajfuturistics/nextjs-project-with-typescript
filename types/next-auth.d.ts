import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // adding extra id field to solve type error in session
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
  // to fix type error in profile in next-auth config/handler function
  interface Profile {
    email: string;
    name: string;
    picture: string;
  }
}
