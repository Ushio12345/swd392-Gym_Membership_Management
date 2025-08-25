import { signInWithPopup } from "firebase/auth";
// src/api/google-login.ts

import { auth, googleProvider } from "./../../firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    // 1. Google popup login
    const result = await signInWithPopup(auth, googleProvider);

    // 2. Get Firebase ID token
    const idToken = await result.user.getIdToken();

    // 3. Send to backend
    const response = await fetch(
      "https://095d26e56767.ngrok-free.app/api/firebase-auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Login successful
      localStorage.setItem("jwt_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Login successful:", data);
    } else {
      // Login failed
      console.error("Login failed:", data.error);
    }
  } catch (error) {
    console.error("Google login error:", error);
  }
};
