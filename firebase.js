<script type="module">
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs, query, orderBy,
  serverTimestamp, doc, updateDoc, arrayUnion, onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// 🔧 Senin proje ayarların
const firebaseConfig = {
  apiKey: "AIzaSyCge9-P5yZu0iq44omQ1ndtlMP_o98iDHE",
  authDomain: "veridium-3ad51.firebaseapp.com",
  projectId: "veridium-3ad51",
  storageBucket: "veridium-3ad51.appspot.com",
  messagingSenderId: "910004709745",
  appId: "1:910004709745:web:d6cd5a71e1e208cebbaed0",
  measurementId: "G-72X897ZVLG"
};

let app, auth, db;
try {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db   = getFirestore(app);
  await setPersistence(auth, browserLocalPersistence);
} catch(e){
  console.warn("Firebase init uyarı:", e?.message||e);
}

// UI toggle (login/guest)
onAuthStateChanged(auth, (user)=>{
  document.querySelectorAll(".guestOnly").forEach(el=> el.style.display = user ? "none" : "");
  document.querySelectorAll(".userOnly").forEach(el=> el.style.display  = user ? "" : "none");
  const mail = document.getElementById("userEmail");
  if (mail) mail.textContent = user ? user.email : "";
});

// Çıkış yakala
document.addEventListener("click",(e)=>{
  const t = e.target;
  if (t && t.id === "logoutBtn"){
    signOut(auth).then(()=>location.href="index.html")
      .catch(err=>alert("Çıkış hatası: "+(err.code||err.message)));
  }
});

// Dışa aktar (app.js kullanacak)
window.__VERIDIUM__ = { auth, db, // auth helpers
  login:  (email,pass)=>signInWithEmailAndPassword(auth,email,pass),
  signup: (email,pass)=>createUserWithEmailAndPassword(auth,email,pass),
  onAuthStateChanged, signOut,
  // firestore helpers
  addDoc, getDocs, query, orderBy, serverTimestamp, collection, doc, updateDoc, arrayUnion, onSnapshot
};
</script>
