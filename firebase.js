<script type="module">
// Firebase SDK'ları (CDN üzerinden, ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// !!! KENDİ PROJE AYARLARIN (senden aldığım değerlerle)
const firebaseConfig = {
  apiKey: "AIzaSyCge9-P5yZu0iq44omQ1ndtlMP_o98iDHE",
  authDomain: "veridium-3ad51.firebaseapp.com",
  projectId: "veridium-3ad51",
  // DÜZELTİLDİ: appspot.com olmalı
  storageBucket: "veridium-3ad51.appspot.com",
  messagingSenderId: "910004709745",
  appId: "1:910004709745:web:d6cd5a71e1e208cebbaed0",
  measurementId: "G-72X897ZVLG"
};

// Başlat
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Oturum kalıcı olsun (sekme kapansa bile)
await setPersistence(auth, browserLocalPersistence);

// Küçük yardımcılar
function normalizeErr(e){
  if(!e || !e.code) return String(e);
  switch(e.code){
    case "auth/invalid-email":   return "E-posta biçimi geçersiz.";
    case "auth/missing-password":
    case "auth/weak-password":   return "Şifre en az 6 karakter olmalı.";
    case "auth/user-not-found":  return "Kullanıcı bulunamadı.";
    case "auth/wrong-password":  return "Şifre hatalı.";
    case "auth/email-already-in-use": return "Bu e-posta zaten kayıtlı.";
    default: return `${e.code}`;
  }
}

// Dışarı açtığım API (global)
window.__VERI__ = {
  auth,
  me() { return auth.currentUser; },
  email() { return auth.currentUser?.email ?? null; },

  async login(email, pass){
    const c = await signInWithEmailAndPassword(auth, email, pass);
    return c.user;
  },

  async signup(email, pass){
    const c = await createUserWithEmailAndPassword(auth, email, pass);
    return c.user;
  },

  async logout(){
    await signOut(auth);
  },

  onAuth(cb){
    return onAuthStateChanged(auth, cb);
  },

  err: normalizeErr
};
</script>
