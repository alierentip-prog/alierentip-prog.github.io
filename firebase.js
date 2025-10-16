<script type="module">
  // Firebase SDK importları
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
    from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

  // 🔧 Firebase yapılandırması
  const firebaseConfig = {
    apiKey: "AIzaSyCge9-P5yZu0iq44omQ1ndtlMP_o98iDHE",
    authDomain: "veridium-3ad51.firebaseapp.com",
    projectId: "veridium-3ad51",
    storageBucket: "veridium-3ad51.appspot.com", // DÜZELTİLMİŞ
    messagingSenderId: "910004709745",
    appId: "1:910004709745:web:d6cd5a71e1e208cebbaed0",
    measurementId: "G-72X897ZVLG"
  };

  // 🚀 Firebase başlatma
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // 🧠 Login ve Sign-Up butonları
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  // GİRİŞ YAP
  loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("✅ Giriş başarılı!");
      window.location.href = "index.html"; // yönlendirme
    } catch (error) {
      alert("❌ Giriş başarısız: " + error.message);
    }
  });

  // ÜYE OL
  signupBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("🎉 Kayıt başarılı!");
    } catch (error) {
      alert("⚠️ Hata: " + error.message);
    }
  });
</script>
