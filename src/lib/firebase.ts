import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Only initialize when the required config is present (guards SSG/SSR on Vercel)
const hasConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

if (hasConfig) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  _auth = getAuth(app);
  _db = getFirestore(app);
}

// Export as non-null — consumers are all "use client" components that only
// run in the browser where env vars are always present via NEXT_PUBLIC_*
export const auth = _auth as Auth;
export const db = _db as Firestore;

// Analytics only in browser and only when measurementId is configured
export let analytics: Analytics | null = null;

if (typeof window !== "undefined" && hasConfig && process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
  isSupported().then((supported) => {
    if (supported && app) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
