import { toast } from "react-toastify";
import axiosInstance from "../aixos/axiosInstance";
import type { Center } from "../constant/types/package";

export const getCenterById = async (id: number): Promise<Center | null> => {
  try {
    const res = await axiosInstance.get<Center>(`/centers/${id}`);

    if (!res || typeof res !== "object") {
      console.warn("Dữ liệu API không hợp lệ:", res);
      return null;
    }

    return res;
  } catch (error) {
    console.error(
      `Error fetching center in package plan with id=${id}:`,
      error
    );
    toast.error("Error fetching center in package plan");
    return null;
  }
};
