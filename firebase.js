<script type="module">
  // Firebase importları (Authentication için)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
    from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

  // 🔧 Senin Firebase yapılandırman
  const firebaseConfig = {
    apiKey: "AIzaSyCge9-P5yZu0iq44omQ1ndtlMP_o98iDHE",
    authDomain: "veridium-3ad51.firebaseapp.com",
    projectId: "veridium-3ad51",
    storageBucket: "veridium-3ad51.firebasestorage.app",
    messagingSenderId: "910004709745",
    appId: "1:910004709745:web:d6cd5a71e1e208cebbaed0",
    measurementId: "G-72X897ZVLG"
  };

  // 🚀 Firebase'i başlat
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // 💡 Fonksiyonları global değişken olarak dışa aktar
  window.auth = auth;
  window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
  window.signInWithEmailAndPassword = signInWithEmailAndPassword;
  window.signOut = signOut;
</script>
