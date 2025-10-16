<!-- firebase.js -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

  // TODO: BURAYA KENDİ CONFIG'İNİ YAPIŞTIR
  // Firebase console > Project settings > Web app > "Use a <script> tag" bölümündeki config
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "XXXX",
    appId: "XXXX"
  };

  // Init
  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Oturum kalıcı olsun (sayfa yenilemede düşmesin)
  await setPersistence(auth, browserLocalPersistence);

  // Header’daki “Giriş / Çıkış” butonunu dinamik güncelle (isteğe bağlı)
  const headerLogin = document.querySelector('[data-login-link]');
  if (headerLogin) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        headerLogin.textContent = "Çıkış";
        headerLogin.onclick = async (e) => {
          e.preventDefault();
          await signOut(auth);
          location.reload();
        };
      } else {
        headerLogin.textContent = "Giriş";
        headerLogin.setAttribute("href","/login.html");
        headerLogin.onclick = null;
      }
    });
  }

  // Global export (diğer sayfalarda kullanabilelim)
  window.__firebase = { app, auth };
</script>
