import axiosInstance from "../aixos/axiosInstance";
import type { Package } from "../constant/types/package";

export const getPackagePlan = async (): Promise<Package[]> => {
  try {
    const res = await axiosInstance.get<Package[]>("/package-plans");
    if (!Array.isArray(res)) {
      console.warn("Dữ liệu API không phải là mảng:", res);
      return [];
    }
    return res;
  } catch (error) {
    console.error("Error fetching package plans:", error);
    throw error;
  }
};
