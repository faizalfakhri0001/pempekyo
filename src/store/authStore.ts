/** @format */

'use client';
import {
  RegisterDetails,
  loginWithGoogle as firebaseGoogleLogin,
  login as firebaseLogin,
  register as firebaseRegister,
} from '@/lib/auth';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types/components';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (details: RegisterDetails) => Promise<User | null>;
  loginWithGoogle: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const cred = await firebaseLogin(
            credentials.email,
            credentials.password
          );
          if (!cred) return null;

          const docRef = doc(db, 'users', cred.user.uid);
          const snap = await getDoc(docRef);
          const data = snap.data() as Partial<User> | undefined;

          const user: User = {
            id: cred.user.uid,
            email: cred.user.email ?? credentials.email,
            name: data?.name ?? '',
          };

          set({ user, isLoggedIn: true, isLoading: false });
          return user;
        } catch (error) {
          console.error('Login failed', error);
          set({ isLoading: false });
          return null;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          const cred = await firebaseGoogleLogin();
          if (!cred) return null;

          const docRef = doc(db, 'users', cred.user.uid);
          const snap = await getDoc(docRef);
          const data = snap.data() as Partial<User> | undefined;

          const user: User = {
            id: cred.user.uid,
            email: cred.user.email ?? '',
            name: data?.name ?? '',
          };

          set({ user, isLoggedIn: true, isLoading: false });
          return user;
        } catch (error) {
          console.error('Google login failed', error);
          set({ isLoading: false });
          return null;
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, isLoggedIn: false });
      },

      register: async (details) => {
        set({ isLoading: true });
        try {
          const cred = await firebaseRegister(details);
          if (!cred) return null;

          const user: User = {
            id: cred.user.uid,
            email: details.email,
            name: details.name,
          };

          set({ user, isLoggedIn: true, isLoading: false });
          return user;
        } catch (error) {
          console.error('Registration failed', error);
          set({ isLoading: false });
          return null;
        }
      },
    }),
    {
      name: 'auth-store', // nama key di localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
