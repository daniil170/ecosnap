import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Твои уникальные ключи доступа
const firebaseConfig = {
  apiKey: "AIzaSyAyLpBTAJ91S2yifcKGlqjTzS8YdH86CcU",
  authDomain: "ecosnap-a0577.firebaseapp.com",
  projectId: "ecosnap-a0577",
  storageBucket: "ecosnap-a0577.firebasestorage.app",
  messagingSenderId: "679340735959",
  appId: "1:679340735959:web:d43300970a54e0624d5f92"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Подключаем нужные сервисы и экспортируем их для использования в App.js
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const googleProvider = provider; //