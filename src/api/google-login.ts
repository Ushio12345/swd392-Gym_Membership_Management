import { signInWithPopup } from "firebase/auth";
import axiosInstance from "../aixos/axiosInstance";
import { auth, googleProvider } from "../../firebaseConfig";
import type { User } from "../lib/context/authContext";

interface LoginResponse {
  token: string;
  user: User;
}

export const signInWithGoogle = async (): Promise<LoginResponse> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
<<<<<<< HEAD
    const data = await axiosInstance.post<LoginResponse>(
      "/firebase-auth/login",
      { idToken }
=======

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
>>>>>>> origin/yen-thao
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
