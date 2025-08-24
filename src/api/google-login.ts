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
    const data = await axiosInstance.post<LoginResponse>(
      "/firebase-auth/login",
      { idToken }
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
