// src/config/firebase.ts
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1C1xpRWv2nl_91R134zpyyKl1ljTpBGI",
  authDomain: "gym-bowling-app.firebaseapp.com",
  projectId: "gym-bowling-app",
  storageBucket: "gym-bowling-app.firebasestorage.app",
  messagingSenderId: "447804408653",
  appId: "1:447804408653:web:c6efa77c84bb105f79ed04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
