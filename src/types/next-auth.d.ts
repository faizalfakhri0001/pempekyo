import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: "admin" | "customer";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: "admin" | "customer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "customer";
  }
}
