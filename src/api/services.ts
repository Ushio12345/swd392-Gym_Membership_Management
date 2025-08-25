import { toast } from "react-toastify";
import axiosInstance from "../aixos/axiosInstance";
import type { ServiceType } from "../constant/types/package";

export const getAllServices = async (): Promise<ServiceType[]> => {
  try {
    const res = await axiosInstance.get<ServiceType>(`/service-types/all
`);
    if (!Array.isArray(res)) {
      console.warn("Dữ liệu API không phải là mảng:", res);
      return [];
    }
    return res;
  } catch (error) {
    console.error(`Error fetching all services`, error);
    toast.error("Error fetching all services");
    return [];
  }
};
