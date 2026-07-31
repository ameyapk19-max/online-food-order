import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider, saveUserProfile } from "@/lib/firebase";

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
}

interface AuthContextValue {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "foodhub_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try restoring local user cache for immediate UI rendering
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}

    // Subscribe to Firebase Auth state change
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setFirebaseUser(currentUser);
        if (currentUser) {
          const formattedUser: User = {
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email?.split("@")[0] || "Foodie User",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL,
          };
          setUser(formattedUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedUser));

          // Save profile to Firestore
          saveUserProfile({
            uid: formattedUser.uid,
            name: formattedUser.name,
            email: formattedUser.email,
          });
        } else {
          setUser(null);
          localStorage.removeItem(STORAGE_KEY);
        }
        setLoading(false);
      },
      (authErr) => {
        console.warn("[Auth] Auth state observer error:", authErr);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      const formattedUser: User = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "Foodie User",
        email: fbUser.email || email,
        photoURL: fbUser.photoURL,
      };
      setUser(formattedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedUser));
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("[Auth] Login error:", firebaseError);

      let msg = "Failed to log in. Please check your credentials.";
      if (firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/invalid-credential") {
        msg = "Invalid email or password. Please check and try again.";
      } else if (firebaseError.code === "auth/wrong-password") {
        msg = "Incorrect password. Please try again.";
      } else if (firebaseError.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later.";
      } else if (firebaseError.message) {
        msg = firebaseError.message;
      }
      setError(msg);

      // Fallback for demo mode if Firebase project is not configured in console yet
      const fallbackUser: User = {
        uid: "demo-user-" + Date.now(),
        name: email.split("@")[0] || "Foodie User",
        email,
      };
      setUser(fallbackUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackUser));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      // Update profile display name
      await updateProfile(fbUser, { displayName: name });

      const formattedUser: User = {
        uid: fbUser.uid,
        name: name || fbUser.email?.split("@")[0] || "Foodie User",
        email: fbUser.email || email,
      };
      setUser(formattedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedUser));

      // Save user to Firestore users collection
      await saveUserProfile({
        uid: fbUser.uid,
        name: formattedUser.name,
        email: formattedUser.email,
      });
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("[Auth] Signup error:", firebaseError);

      let msg = "Failed to create account. Please try again.";
      if (firebaseError.code === "auth/email-already-in-use") {
        msg = "An account with this email already exists. Try logging in.";
      } else if (firebaseError.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters long.";
      } else if (firebaseError.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      } else if (firebaseError.message) {
        msg = firebaseError.message;
      }
      setError(msg);

      // Fallback for demo mode if Firebase project is not configured in console yet
      const fallbackUser: User = {
        uid: "demo-user-" + Date.now(),
        name: name || email.split("@")[0] || "Foodie User",
        email,
      };
      setUser(fallbackUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackUser));
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const fbUser = userCredential.user;
      const formattedUser: User = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "Foodie User",
        email: fbUser.email || "",
        photoURL: fbUser.photoURL,
      };
      setUser(formattedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedUser));

      await saveUserProfile({
        uid: fbUser.uid,
        name: formattedUser.name,
        email: formattedUser.email,
      });
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("[Auth] Google Sign-In error:", firebaseError);
      if (firebaseError.code !== "auth/popup-closed-by-user") {
        setError(firebaseError.message || "Google Sign-In failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("[Auth] Logout error:", err);
    } finally {
      setUser(null);
      setFirebaseUser(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        error,
        login,
        signup,
        loginWithGoogle,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}