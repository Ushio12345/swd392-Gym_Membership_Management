import axiosInstance from "../aixos/axiosInstance";

const BASE_URL = "https://ae332185633a.ngrok-free.app/api/staff/packages";

// Lấy tất cả package
export const fetchPackages = async () => {
  try {
    console.log("Calling API:", BASE_URL); // Debug log
    const res = await axiosInstance.get(BASE_URL);
    console.log("Raw API response:", res); // Debug log
    
    // Handle different response structures from your API
    if (res?.data) {
      return res.data;
    } else if (Array.isArray(res)) {
      return res;
    } else {
      console.warn("Unexpected response structure:", res);
      return [];
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

// Tạo package mới  
export const createPackage = async (data: {
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerId: number;
  serviceIds: number[];
  isActive: boolean;
}) => {
  try {
    const res = await axiosInstance.post(BASE_URL, data);
    return res.data || res;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

// Cập nhật package
export const updatePackage = async (id: number, data: {
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerId: number;
  serviceIds: number[];
  isActive: boolean;
}) => {
  try {
    const res = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return res.data || res;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
};

// Xóa package
export const deletePackage = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return res.data || res;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};

// Đổi trạng thái package (toggle active/inactive)
export const toggleStatus = async (id: number) => {
  try {
    const res = await axiosInstance.patch(`${BASE_URL}/${id}/toggle-status`);
    return res.data || res;
  } catch (error) {
    console.error("Error toggling package status:", error);
    throw error;
  }
};

// Lấy package theo ID (optional - có thể hữu ích)
export const getPackageById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/${id}`);
    return res.data || res;
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    throw error;
  }
};