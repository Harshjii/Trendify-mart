import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "./app/firebaseConfig";
import { collection, getDocs, setDoc, doc, addDoc, query, where } from "firebase/firestore";
import { db } from "./app/firebaseConfig";

// Login
export async function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Signup with name
export async function signupWithEmail(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential;
}

// Forgot Password
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function saveCart(userId, cart) {
  await setDoc(doc(db, "carts", userId), { cart });
}

// Store order
export async function placeOrder(orderData) {
  await addDoc(collection(db, "orders"), orderData);
}

// Fetch user orders
export async function fetchUserOrders(userId) {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}