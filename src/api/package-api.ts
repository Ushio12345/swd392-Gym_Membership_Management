import axiosInstance from "../aixos/axiosInstance";
import type { Package, PackagePlanDetail } from "../constant/types/package";

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

export const getPackagePlanById = async (
  id: number
): Promise<Package | null> => {
  try {
    const res = await axiosInstance.get<Package>(`/package-plans/${id}`);

    if (!res || typeof res !== "object") {
      console.warn("Dữ liệu API không hợp lệ:", res);
      return null;
    }

    return res;
  } catch (error) {
    console.error(`Error fetching package plan with id=${id}:`, error);
    return null;
  }
};

export const getPackagePlanDetail = async (
  id: number
): Promise<PackagePlanDetail | null> => {
  try {
    const res = await axiosInstance.get<PackagePlanDetail>(
      `/package-plan-details/${id}`
    );

    if (!res || typeof res !== "object") {
      console.warn("Dữ liệu API không hợp lệ:", res);
      return null;
    }

    return res;
  } catch (error) {
    console.error(`Error fetching package plan detail with id=${id}:`, error);
    return null;
  }
};

export const getPackageByServiceId = async (
  id: number
): Promise<PackagePlanDetail | null> => {
  try {
    const res = await axiosInstance.get<PackagePlanDetail>(
      `/package-plan-details/service/${id}`
    );

    if (!res || typeof res !== "object") {
      console.warn("Dữ liệu API không hợp lệ:", res);
      return null;
    }

    return res;
  } catch (error) {
    console.error(
      `Error fetching package plan detail with services id=${id}:`,
      error
    );
    return null;
  }
};
