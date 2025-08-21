import axios from "axios";

const axiosInstance = axios.create({
  // Sử dụng proxy thay vì direct call
  baseURL: "", // Empty string để sử dụng same origin
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});


// Request interceptor để log các request
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor để handle lỗi chung
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    
    // Xử lý các lỗi phổ biến
    if (error.response) {
      // Server trả về lỗi
      console.error("Error Response:", error.response.status, error.response.data);
    } else if (error.request) {
      // Không nhận được response
      console.error("No response received:", error.request);
    } else {
      // Lỗi khác
      console.error("Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;