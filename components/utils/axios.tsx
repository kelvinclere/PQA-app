import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const API_URL = "https://8add-41-76-168-3.ngrok-free.app";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

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
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("Request sent with headers:", config.headers); 
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response received:", response);
    return response;
  },
  async (error: AxiosError) => {
    console.error("Response error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        const success = await refreshAccessToken(refreshToken);
        if (success) {
          const accessToken = await AsyncStorage.getItem("accessToken");
          if (accessToken) {
            error.config.headers["Authorization"] = `Bearer ${accessToken}`;
            console.log("Retrying request with new access token...");
            return axiosInstance(error.config); 
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken?: string): Promise<boolean> => {
  if (!refreshToken) return false;

  try {
    console.log("Refreshing access token...");
    const { data } = await axiosInstance.post<{ accessToken: string; refreshToken?: string }>(
      "/api/refresh-access-token",
      { refreshToken }
    );

    console.log("Token refresh successful:", data);

    // Store the new access token
    await AsyncStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) {
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    }

    return true;
  } catch (error) {
    console.error("Token refresh failed", error.response?.data || error.message);
    return false;
  }
};

export default axiosInstance;
