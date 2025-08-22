import { signInWithPopup } from "firebase/auth";
import axiosInstance from "../aixos/axiosInstance";
import { auth, googleProvider } from "../../firebaseConfig";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const signInWithGoogle = async (): Promise<LoginResponse> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const { data } = await axiosInstance.post<LoginResponse>(
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
