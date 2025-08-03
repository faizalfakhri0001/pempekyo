/** @format */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'customer';
  [key: string]: unknown;
}

export async function register(
  details: RegisterDetails
): Promise<UserCredential | null> {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      details.email,
      details.password
    );
    details.password = '';
    await setDoc(doc(db, 'users', cred.user.uid), {
      ...details,
      name: details.name,
      email: details.email,
      role: details.role ?? 'customer',
    });
    return cred;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return cred;
  } catch {
    return null;
  }
}

export async function loginWithGoogle(): Promise<UserCredential | null> {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    return cred;
  } catch {
    return null;
  }
}
