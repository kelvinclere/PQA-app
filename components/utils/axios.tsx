import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const API_URL = "https://407e-41-76-168-3.ngrok-free.app";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Function to attach the access token dynamically
export const setAuthToken = (accessToken?: string) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = await AsyncStorage.getItem("accessToken"); // Get token from AsyncStorage
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        const success = await refreshAccessToken(refreshToken);
        if (success) {
          const accessToken = await AsyncStorage.getItem("accessToken");
          if (accessToken) {
            error.config.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(error.config); // Retry the request
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

// Function to refresh access token
const refreshAccessToken = async (refreshToken?: string): Promise<boolean> => {
  if (!refreshToken) return false;

  try {
    const { data } = await axiosInstance.post<{ accessToken: string; refreshToken?: string }>(
      "/api/refresh-access-token",
      { refreshToken }
    );

    await AsyncStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) {
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    }

    return true;
  } catch (error) {
    console.error("Token refresh failed", error);
    return false;
  }
};

export default axiosInstance;
