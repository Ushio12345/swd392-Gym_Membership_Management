import axiosInstance from "../aixos/axiosInstance";

// Không cần BASE_URL ghi cứng nữa
const API_PATH = "/api/staff/packages";

// Lấy tất cả package
export const fetchPackages = async () => {
  const res = await axiosInstance.get(API_PATH);
  return res.data;
};

// Tạo package mới
export const createPackage = async (data: any) => {
  const res = await axiosInstance.post(API_PATH, data);
  return res.data;
};

// Cập nhật package
export const updatePackage = async (id: number, data: any) => {
  const res = await axiosInstance.put(`${API_PATH}/${id}`, data);
  return res.data;
};

// Xóa package
export const deletePackage = async (id: number) => {
  const res = await axiosInstance.delete(`${API_PATH}/${id}`);
  return res.data;
};

// Đổi trạng thái package
export const toggleStatus = async (id: number) => {
  const res = await axiosInstance.patch(`${API_PATH}/${id}/toggle-status`);
  return res.data;
};

