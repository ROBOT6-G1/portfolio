import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCikMlADpeQ7RH74RUborBVJ4P81zwAHTE",
  authDomain: "gen-lang-client-0344726942.firebaseapp.com",
  projectId: "gen-lang-client-0344726942",
  storageBucket: "gen-lang-client-0344726942.firebasestorage.app",
  messagingSenderId: "625686759389",
  appId: "1:625686759389:web:bd8d94381a001d850a1834"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, setDoc, getDoc };