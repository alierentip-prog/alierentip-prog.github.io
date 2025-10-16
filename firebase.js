<!-- firebase.js -->
<script type="module">
  // Firebase SDK (v12 modülleri)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import {
    getAuth, setPersistence, browserLocalPersistence,
    onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut
  } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

  // 🔐 Senin AZURA projenin config'i
  const firebaseConfig = {
    apiKey: "AIzaSyCymtjBWJ2cH2k6gzXr-wzj6vJVkwEcZE",
    authDomain: "azura-portal.firebaseapp.com",
    projectId: "azura-portal",
    storageBucket: "azura-portal.firebasestorage.app",
    messagingSenderId: "773402450419",
    appId: "1:773402450419:web:3c0888f055d98c8e5bda86"
  };

  // Init
  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);

  // Küçük yardımcılar
  const login  = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const signup = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
  const logout = () => signOut(auth);
  const onAuth = (cb) => onAuthStateChanged(auth, cb);

  // Global yayımla (import uğraştırmasın)
  window.AZ = { app, auth, login, signup, logout, onAuth };
</script>
