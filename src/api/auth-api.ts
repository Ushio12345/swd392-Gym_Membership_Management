import axiosInstance from "../aixos/axiosInstance";
import type { LoginType } from "../constant/types/auth";

export const loginApi = async (data: LoginType) => {
  try {
    const res: any = await axiosInstance.post("auth/login", data);
    return res;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerApi = async (data: LoginType) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res;
  } catch (error: any) {
    console.error("Register error:", error);
    throw error;
  }
};
