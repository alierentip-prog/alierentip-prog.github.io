// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// 🔧 senin projen (Firebase console'dakiyle aynı)
const firebaseConfig = {
  apiKey: "AIzaSyCge9-P5yZu0iq44omQ1ndtlMP_o98iDHE",
  authDomain: "veridium-3ad51.firebaseapp.com",
  projectId: "veridium-3ad51",
  storageBucket: "veridium-3ad51.firebasestorage.app",
  messagingSenderId: "910004709745",
  appId: "1:910004709745:web:d6cd5a71e1e208cebbaed0",
  measurementId: "G-72X897ZVLG"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// oturum sayfa yenilemede kalsın
setPersistence(auth, browserLocalPersistence).catch(console.error);

// auth durumuna göre UI toggle
onAuthStateChanged(auth, (user) => {
  document.querySelectorAll(".guestOnly").forEach(el => el.style.display = user ? "none" : "");
  document.querySelectorAll(".userOnly").forEach(el => el.style.display  = user ? "" : "none");
  const mail = document.getElementById("userEmail");
  if (mail) mail.textContent = user ? user.email : "";
});

// çıkış
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logoutBtn") {
    signOut(auth).then(()=>{ location.href = "index.html"; })
                 .catch(err => alert("Çıkış hatası: " + (err.code || err.message)));
  }
});

// login.html'in kullanacağı yardımcılar
export async function loginWithEmail(email, pass) {
  return signInWithEmailAndPassword(auth, email, pass);
}
export async function signupWithEmail(email, pass) {
  return createUserWithEmailAndPassword(auth, email, pass);
}
