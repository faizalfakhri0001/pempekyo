import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User as AppUser } from "@/types/components";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const cred = await login(credentials.email, credentials.password);
        if (!cred) {
          return null;
        }
        const docRef = doc(db, "users", cred.user.uid);
        const snap = await getDoc(docRef);
        const data = snap.data() as Partial<AppUser> | undefined;
        return {
          id: cred.user.uid,
          email: cred.user.email ?? credentials.email,
          name: data?.name ?? cred.user.displayName ?? "",
          role: data?.role ?? "customer",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const docRef = doc(db, "users", user.email as string);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data() as Partial<AppUser>;
          user.role = data.role ?? "customer";
        } else {
          await setDoc(docRef, {
            name: user.name,
            email: user.email,
            role: "customer",
          });
          user.role = "customer";
        }
        user.id = user.email as string;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AppUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as typeof session.user.role;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

