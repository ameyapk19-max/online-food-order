import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyYourApiKeyHere",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "food-hub-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "food-hub-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "food-hub-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
};

// Check if valid user config is configured (not default placeholders)
export const isFirebaseConfigured = (): boolean => {
  return (
    Boolean(import.meta.env.VITE_FIREBASE_API_KEY) &&
    import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyYourApiKeyHere"
  );
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

// Firestore Helper Functions

export interface FirestoreUserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FirestoreOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface FirestoreOrder {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: FirestoreOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: {
    address: string;
    city: string;
    zipCode: string;
    notes?: string;
  };
  paymentMethod: string;
  status: "pending" | "preparing" | "delivering" | "completed" | "cancelled";
  createdAt?: unknown;
}

/**
 * Save or update user profile details in Firestore
 */
export async function saveUserProfile(profile: FirestoreUserProfile) {
  try {
    const userRef = doc(db, "users", profile.uid);
    await setDoc(
      userRef,
      {
        uid: profile.uid,
        name: profile.name,
        email: profile.email,
        updatedAt: serverTimestamp(),
        createdAt: profile.createdAt || serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("[Firebase] Unable to save user profile to Firestore:", error);
  }
}

/**
 * Save an order into Firestore 'orders' collection
 */
export async function createOrder(orderData: Omit<FirestoreOrder, "id" | "createdAt" | "status">) {
  try {
    const ordersCol = collection(db, "orders");
    const docRef = await addDoc(ordersCol, {
      ...orderData,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn("[Firebase] Unable to create order in Firestore:", error);
    return null;
  }
}

/**
 * Fetch orders for a specific user from Firestore
 */
export async function getUserOrders(userId: string): Promise<FirestoreOrder[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders: FirestoreOrder[] = [];
    querySnapshot.forEach((docSnap) => {
      orders.push({ id: docSnap.id, ...docSnap.data() } as FirestoreOrder);
    });
    return orders;
  } catch (error) {
    console.warn("[Firebase] Unable to fetch user orders from Firestore:", error);
    return [];
  }
}
