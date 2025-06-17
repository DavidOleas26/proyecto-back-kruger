// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXSlTOlNHS_kVVgp7WLeBzA9BG62bzngU",
  authDomain: "proyecto-final-e2607.firebaseapp.com",
  projectId: "proyecto-final-e2607",
  storageBucket: "proyecto-final-e2607.firebasestorage.app",
  messagingSenderId: "52196217532",
  appId: "1:52196217532:web:bd0bdf43c681fd5c1ef6b9",
  measurementId: "G-DPKWZZZT50",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const auth = getAuth(app);
export const db = getFirestore(app);
