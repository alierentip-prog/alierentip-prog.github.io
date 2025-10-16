// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// === senin proje ===
const firebaseConfig = {
  apiKey: "AIzaSyBuqAmIViriBI5X41NNHKB8wj9nQuKieNk",
  authDomain: "veridium-prode.firebaseapp.com",
  projectId: "veridium-prode",
  storageBucket: "veridium-prode.firebasestorage.app",
  messagingSenderId: "1000050899761",
  appId: "1:1000050899761:web:a0e46bc89c40a1d02f0e10"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// küçük yardımcılar
const login  = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
const signup = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
const logout = () => signOut(auth);

// auth durumunu yay
onAuthStateChanged(auth, (user) => {
  window.dispatchEvent(new CustomEvent("veridium-auth", { detail:{ user } }));
});

// global export
window.__VERI__ = { app, auth, login, signup, logout };
