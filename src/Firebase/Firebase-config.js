import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOkCkt52V3e8AQVDCDmGc-MUVVuNbU-5w",
  authDomain: "subapp-b6f8a.firebaseapp.com",
  projectId: "subapp-b6f8a",
  storageBucket: "subapp-b6f8a.firebasestorage.app",
  messagingSenderId: "172461013899",
  appId: "1:172461013899:web:1083444f9ef59800534d8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); 
export const provider = new GoogleAuthProvider(); 
export default app;