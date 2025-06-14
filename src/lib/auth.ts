import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  [key: string]: unknown;
}

export async function register(details: RegisterDetails): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(
    auth,
    details.email,
    details.password
  );
  await setDoc(doc(db, 'users', cred.user.uid), {
    name: details.name,
    email: details.email,
    ...details,
    password: undefined,
  });
  return cred;
}

export async function login(email: string, password: string): Promise<UserCredential> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred;
}
