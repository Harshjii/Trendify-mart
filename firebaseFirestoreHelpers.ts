import { db } from "./app/firebaseConfig";
import { collection, getDocs, setDoc, doc, addDoc, query, where } from "firebase/firestore";

// Product list fetch
export async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Cart data store
export async function saveCart(userId: string, cart: any[]) {
  await setDoc(doc(db, "carts", userId), { cart });
}

// Order store
export async function placeOrder(orderData: any) {
  await addDoc(collection(db, "orders"), orderData);
}

// User orders fetch
export async function fetchUserOrders(userId: string) {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}