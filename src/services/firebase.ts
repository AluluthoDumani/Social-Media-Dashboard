// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// REPLACE THIS with your actual Firebase config from Step 3
const firebaseConfig = {
  apiKey: "AIzaSyAJWsEBhT0evzcIPWGzc6VRkhfAv8g_7NA",
  authDomain: "social-media-dashboard-b2daa.firebaseapp.com",
  projectId: "social-media-dashboard-b2daa",
  storageBucket: "social-media-dashboard-b2daa.firebasestorage.app",
  messagingSenderId: "188284073563",
  appId: "1:188284073563:web:11ca61120f3788c0e4b17e",
  measurementId: "G-DTD72FSCZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;