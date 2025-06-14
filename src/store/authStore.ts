'use client';
import { User } from '@/types/components';
import { create } from 'zustand';
import { RegisterDetails, login as firebaseLogin, register as firebaseRegister } from '@/lib/auth';
import { signOut } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (details: RegisterDetails) => Promise<User | null>;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const cred = await firebaseLogin(credentials.email, credentials.password);
      const docRef = doc(db, 'users', cred.user.uid);
      const snap = await getDoc(docRef);
      const data = snap.data() as Partial<User> | undefined;
      const user: User = {
        id: cred.user.uid,
        email: cred.user.email ?? credentials.email,
        name: data?.name,
      };
      set({ user, isLoggedIn: true, isLoading: false });
      return user;
    } catch (error) {
      console.error('Login failed', error);
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
      const user: User = { id: cred.user.uid, email: details.email, name: details.name };
      set({ user, isLoggedIn: true, isLoading: false });
      return user;
    } catch (error) {
      console.error('Registration failed', error);
      set({ isLoading: false });
      return null;
    }
  },
}));
