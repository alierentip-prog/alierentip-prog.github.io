<script type="module">
// app.js
const F = window.__VERIDIUM__ || {};
const useFS = !!F.db; // Firestore mevcut mu?

const LS = {
  read(key, def=[]) { try{ return JSON.parse(localStorage.getItem(key)||JSON.stringify(def)); }catch{ return def } },
  write(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
};

// Echo koleksiyon adı
const ECHO = "echo_posts_v1";

// ---- Echo API ----
export const Echo = {
  async list(cb){
    if (useFS){
      const q = F.query(F.collection(F.db,ECHO), F.orderBy("ts","desc"));
      return F.onSnapshot(q, snap=>{
        const data = snap.docs.map(d=>({id:d.id, ...d.data()}));
        cb?.(data);
      });
    } else {
      const data = LS.read(ECHO, []);
      cb?.(data.sort((a,b)=> (b.ts||0)-(a.ts||0)));
      return ()=>{};
    }
  },
  async add({text, author}){
    const item = { text, author: author||"Anonim", likes:[], comments:[], ts: Date.now() };
    if (useFS){
      await F.addDoc(F.collection(F.db,ECHO), { ...item, ts: F.serverTimestamp() });
    } else {
      const data = LS.read(ECHO, []); data.unshift(item); LS.write(ECHO, data);
    }
  },
  async like(id, user){
    if (!user) return alert("Önce giriş yap.");
    if (useFS){
      const ref = F.doc(F.db, ECHO, id);
      await F.updateDoc(ref, { likes: F.arrayUnion(user.email) });
    } else {
      const data = LS.read(ECHO, []);
      const row = data.find(r=> r.id===id || r.ts===id);
      if (!row) return;
      if (!row.likes.includes(user.email)) row.likes.push(user.email);
      LS.write(ECHO, data);
    }
  },
  async comment(id, user, text){
    if (!user) return alert("Önce giriş yap.");
    if (useFS){
      const ref = F.doc(F.db, ECHO, id);
      await F.updateDoc(ref, { comments: F.arrayUnion({ by:user.email, text, t: Date.now() }) });
    } else {
      const data = LS.read(ECHO, []);
      const row = data.find(r=> r.id===id || r.ts===id);
      if (!row) return;
      row.comments.push({ by:user.email, text, t: Date.now() });
      LS.write(ECHO, data);
    }
  }
};

// ---- Auth shortcuts ----
export const Auth = {
  on(cb){ return F.onAuthStateChanged?.(F.auth, cb); },
  login(email, pass){ return F.login(email, pass); },
  signup(email, pass){ return F.signup(email, pass); },
  logout(){ return F.signOut(F.auth); },
  current(){ return F.auth?.currentUser || null; }
};
</script>
