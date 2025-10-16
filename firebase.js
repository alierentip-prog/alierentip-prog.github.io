<script type="module">
// ===== firebase.js =====
// 1) Firebase Console > Project settings > "Your apps" > Web'den aldığın snippet'i DOLDUR:
const firebaseConfig = {
  apiKey:        "PASTE_API_KEY_HERE",
  authDomain:    "your-project-id.firebaseapp.com",
  projectId:     "your-project-id",
  // DİKKAT: appspot.com olmalı (firebasestorage.app DEĞİL!)
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId:            "PASTE_APP_ID",
  measurementId:    "PASTE_MEAS_ID"   // opsiyonel
};

// 2) Modüller (aynı sürüm!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// 3) Init
let app, auth;
try {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
} catch (e) {
  console.error("Firebase init hatası:", e);
  alert("Firebase kurulamadı: " + (e.code || e.message));
}

// 4) UI toggle (guest/user)
//   Sayfanda .guestOnly ve .userOnly varsa otomatik gizle/gösterir.
//   <span id="userEmail"> dolarsa girişlisindir.
//   Çıkış butonu id="logoutBtn" ise çalışır.
onAuthStateChanged(auth, (user) => {
  document.querySelectorAll(".guestOnly").forEach(el => el.style.display = user ? "none" : "");
  document.querySelectorAll(".userOnly").forEach(el => el.style.display  = user ? "" : "none");
  const mail = document.getElementById("userEmail");
  if (mail) mail.textContent = user ? user.email : "";
});

// 5) Çıkış
document.addEventListener("click",(e)=>{
  if (e.target && e.target.id === "logoutBtn") {
    signOut(auth).then(()=>location.href = "index.html")
      .catch(err => alert("Çıkış hatası: " + (err.code || err.message)));
  }
});

// 6) Login/Signup helper'ları global ver (login.html kullanacak)
window.__VERI__ = {
  auth,
  login:  (email, pass) => signInWithEmailAndPassword(auth, email, pass),
  signup: (email, pass) => createUserWithEmailAndPassword(auth, email, pass),
  on:     (cb) => onAuthStateChanged(auth, cb)
};

// 7) 30 sn’lik tanı bandı (isteğe bağlı, sorun ayıklama için)
//   Kullanmak istemezsen aşağıdaki blok yorum satırına alın.
{
  const bar = document.createElement('div');
  Object.assign(bar.style,{
    position:'fixed',left:'10px',top:'10px',zIndex:9999,padding:'8px 12px',
    border:'1px solid rgba(255,255,255,.2)',borderRadius:'10px',
    background:'rgba(0,0,0,.45)',backdropFilter:'blur(6px)',color:'#fff',font:'600 12px system-ui'
  });
  document.body.appendChild(bar);
  if (!auth) { bar.textContent = '⚠️ Firebase yüklenmedi'; }
  else {
    bar.textContent = '🟡 Misafir';
    onAuthStateChanged(auth, (u)=> bar.textContent = u ? `✅ ${u.email}` : '🟡 Misafir');
  }
}
</script>
