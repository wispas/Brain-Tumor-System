// static/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCB2MDd-NODuvLgr01T90YRqm--OBzHcV0",
  authDomain: "brain-tumor-254c2.firebaseapp.com",
  projectId: "brain-tumor-254c2",
  storageBucket: "brain-tumor-254c2.appspot.com",
  messagingSenderId: "237702969499",
  appId: "1:237702969499:web:585d2f192acbe8dd722e3e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Expose globally
window.auth = auth;
window.db = db;
