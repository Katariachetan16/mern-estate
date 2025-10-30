// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cf4d1.firebaseapp.com",
  projectId: "mern-estate-cf4d1",
  storageBucket: "mern-estate-cf4d1.firebasestorage.app",
  messagingSenderId: "853063385871",
  appId: "1:853063385871:web:12d3298916271f74db347a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);