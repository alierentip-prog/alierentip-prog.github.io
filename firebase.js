<!-- ES Module olarak kullanacağız -->
<script type="module">
// Firebase SDK'ları
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// 🔐 BU BLOĞU Firebase ekranındaki kendi config'inle doldur
const firebaseConfig = {
  apiKey: "AIzaSyCymtjBWJ2cH2k6gzXr-wzj6vJVkwEcZE",
  authDomain: "azura-portal.firebaseapp.com",
  projectId: "azura-portal",
  storageBucket: "azura-portal.firebasestorage.app",
  messagingSenderId: "773402450419",
  appId: "1:773402450419:web:3c0888f055d98c8e5bda86"
};

// Başlat
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global export (login.html içinde import edeceğiz)
export { auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
</script>
