
'use client';
import { User } from '@/types/components';
import {create} from 'zustand';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password?: string }) => Promise<User | null>; // Password optional for social login
  logout: () => void;
  register: (details: { name: string; email: string; password?: string }) => Promise<User | null>;
  isLoading: boolean;
}

// Mock implementation
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true });
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if ((credentials.email === 'user@example.com' && credentials.password === 'password123') || credentials.email === 'googleuser@example.com' || credentials.email === 'fbuser@example.com') {
          const mockUser: User = { id: '1', email: credentials.email, name: credentials.email.startsWith('google') ? 'Google User' : credentials.email.startsWith('fb') ? 'Facebook User' : 'Test User' };
          set({ user: mockUser, isLoggedIn: true, isLoading: false });
          resolve(mockUser);
        } else {
          set({ isLoading: false });
          resolve(null); // Indicate login failure
        }
      }, 1000);
    });
  },
  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
  register: async (details) => {
    set({ isLoading: true });
     // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: Date.now().toString(), email: details.email, name: details.name };
        set({ user: newUser, isLoggedIn: true, isLoading: false });
        resolve(newUser);
      }, 1000);
    });
  },
}));
