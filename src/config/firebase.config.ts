import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// declare global {
//   interface Window {
//     recaptchaVerifier?: any;
//   }
// }

const firebaseConfig = {
  apiKey: "AIzaSyAxu9K6myaL8mHSJ037dBzPNic0oDtlAbQ",
  authDomain: "auto-crm-b08b7.firebaseapp.com",
  projectId: "auto-crm-b08b7",
  storageBucket: "auto-crm-b08b7.appspot.com",
  messagingSenderId: "285880070580",
  appId: "1:285880070580:web:e5fbedc7f2609770cf82e1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const faceBookProvider = new FacebookAuthProvider();
