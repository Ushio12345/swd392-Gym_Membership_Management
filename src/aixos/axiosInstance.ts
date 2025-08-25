// src/aixos/axiosInstance.ts
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = T>(url: string, config?: any): Promise<R>;
  post<T = any, R = T>(url: string, data?: any, config?: any): Promise<R>;
  put<T = any, R = T>(url: string, data?: any, config?: any): Promise<R>;
  delete<T = any, R = T>(url: string, config?: any): Promise<R>;
}

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url); // Debug log
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor - FIXED: Don't automatically return response.data
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("API Response received:", response.status, response.data); // Debug log
    return response; // Return full response, not just data
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại sau.";

    console.error("API Error:", error); // Debug log

    if (status) {
      switch (status) {
        case 400:
          errorMessage =
            "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.";
          break;
        case 401:
          errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          break;
        case 403:
          errorMessage = "Bạn không có quyền truy cập tài nguyên này.";
          break;
        case 404:
          errorMessage = "Không tìm thấy tài nguyên yêu cầu.";
          break;
        case 429:
          errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.";
          break;
        case 500:
          errorMessage = "Lỗi máy chủ. Vui lòng thử lại sau.";
          break;
        default:
          errorMessage = `Lỗi ${status}: Đã xảy ra sự cố. Vui lòng thử lại.`;
      }
    } else if (error.code === "ERR_NETWORK") {
      errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.";
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    console.error(`Lỗi HTTP ${status || "Unknown"}:`, {
      message: errorMessage,
      error: error.response?.data || error.message,
    });

    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;