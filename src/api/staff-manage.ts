import axiosInstance from "../aixos/axiosInstance";

const API_PATH = "/staff/packages";

// Interface cho Package data
export interface PackageCreateData {
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerId: number;
  serviceIds: number[];
  isActive: boolean;
}

export interface PackageUpdateData extends Partial<PackageCreateData> {}

export const fetchPackages = async () => {
  try {
    const res = await axiosInstance.get(API_PATH);
    console.log("Raw API response:", res); // Debug log
    return res.data || res; // Handle both wrapped and direct responses
  } catch (error: any) {
    console.error("fetchPackages error:", error);

    if (error?.response?.status === 404) {
      throw new Error(
        "API endpoint khÃ´ng tá»“n táº¡i. Vui lÃ²ng kiá»ƒm tra láº¡i."
      );
    } else if (error?.response?.status === 401) {
      throw new Error(
        "Báº¡n cáº§n Ä‘Äƒng nháº­p Ä‘á»ƒ truy cáº­p chá»©c nÄƒng nÃ y."
      );
    } else if (error?.response?.status === 403) {
      throw new Error("Báº¡n khÃ´ng cÃ³ quyá»n truy cáº­p chá»©c nÄƒng nÃ y.");
    }

    throw error;
  }
};

export const createPackage = async (data: PackageCreateData) => {
  try {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("TÃªn package khÃ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng");
    }

    if (!data.centerId || data.centerId <= 0) {
      throw new Error("Center ID khÃ´ng há»£p lá»‡");
    }

    if (!data.serviceIds || data.serviceIds.length === 0) {
      throw new Error("Pháº£i chá»n Ã­t nháº¥t má»™t service");
    }

    if (!data.price || data.price <= 0) {
      throw new Error("GiÃ¡ pháº£i lá»›n hÆ¡n 0");
    }

    console.log("Creating package with data:", data);
    const res = await axiosInstance.post(API_PATH, data);
    return res.data || res;
  } catch (error: any) {
    console.error("createPackage error:", error);

    if (error?.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error?.response?.status === 400) {
      throw new Error(
        "Dá»¯ liá»‡u khÃ´ng há»£p lá»‡. Vui lÃ²ng kiá»ƒm tra láº¡i."
      );
    }

    throw error;
  }
};

export const updatePackage = async (id: number, data: PackageUpdateData) => {
  try {
    if (!id || id <= 0) {
      throw new Error("Package ID khÃ´ng há»£p lá»‡");
    }

    console.log(`Updating package ${id} with data:`, data);
    const res = await axiosInstance.put(`${API_PATH}/${id}`, data);
    return res.data || res;
  } catch (error: any) {
    console.error("updatePackage error:", error);

    if (error?.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error?.response?.status === 404) {
      throw new Error("KhÃ´ng tÃ¬m tháº¥y package cáº§n cáº­p nháº­t");
    }

    throw error;
  }
};

export const deletePackage = async (id: number) => {
  try {
    if (!id || id <= 0) {
      throw new Error("Package ID khÃ´ng há»£p lá»‡");
    }

    console.log(`Deleting package ${id}`);
    const res = await axiosInstance.delete(`${API_PATH}/${id}`);
    return res.data || res;
  } catch (error: any) {
    console.error("deletePackage error:", error);

    if (error?.response?.status === 404) {
      throw new Error("KhÃ´ng tÃ¬m tháº¥y package cáº§n xÃ³a");
    } else if (error?.response?.status === 409) {
      throw new Error("KhÃ´ng thá»ƒ xÃ³a package Ä‘ang Ä‘Æ°á»£c sá»­ dá»¥ng");
    }

    throw error;
  }
};

export const toggleStatus = async (id: number) => {
  try {
    if (!id || id <= 0) {
      throw new Error("Package ID khÃ´ng há»£p lá»‡");
    }

    console.log(`Toggling status for package ${id}`);
    const res = await axiosInstance.patch(`${API_PATH}/${id}/toggle-status`);
    return res.data || res;
  } catch (error: any) {
    console.error("toggleStatus error:", error);

    if (error?.response?.status === 404) {
      throw new Error("KhÃ´ng tÃ¬m tháº¥y package");
    }

    throw error;
  }
};

export const fetchCenters = async () => {
  try {
    // Gọi API services/active để lấy danh sách services có chứa thông tin center
    const res = await axiosInstance.get("/staff/services/active");
    const services = res.data || res;

    console.log("Services response:", services); // Debug log

    if (!Array.isArray(services)) {
      console.warn("Services data is not an array:", services);
      return [];
    }

    // Extract unique centers táº¡i services data
    const centersMap = new Map();

    services.forEach((service: any) => {
      if (service.centerId && service.centerName) {
        centersMap.set(service.centerId, {
          id: service.centerId,
          name: service.centerName,
        });
      }
    });

    // Convert Map to Array
    const centers = Array.from(centersMap.values());
    console.log("Extracted centers:", centers); // Debug log

    return centers;
  } catch (error) {
    console.error("fetchCenters error:", error);
    throw error;
  }
};

export const fetchServicesByCenter = async (centerId: number) => {
  try {
    // Gọi API services/active và filter theo centerId
    const res = await axiosInstance.get("/staff/services/active");
    const allServices = res;

    console.log("All services response:", allServices); // Debug log

    if (!Array.isArray(allServices)) {
      console.warn("Services data is not an array:", allServices);
      return [];
    }

    // Filter services theo centerId
    const centerServices = allServices.filter(
      (service: any) => service.centerId === centerId
    );

    console.log(`Services for center ${centerId}:`, centerServices); // Debug log

    return centerServices;
  } catch (error) {
    console.error("fetchServicesByCenter error:", error);
    throw error;
  }
};
