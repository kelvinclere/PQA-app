import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import {
  UserProfile,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  RefreshTokenResponse,
} from "../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import axiosInstance, { setAuthToken } from "components/utils/axios";

const API_URL = "https://8add-41-76-168-3.ngrok-free.app";

interface AuthContextType {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  isLoading: boolean;
  logout: () => void;
  role: string | null;
}

interface JwtPayload {
  JWTID: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  FirstName: string;
  LastName: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const storedUser = await AsyncStorage.getItem("user");

        // Log the values for debugging
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("storedUser:", storedUser);

        if (!accessToken && !refreshToken && !storedUser) {
          setIsLoading(false);
          return;
        }

        if (accessToken) {
          const decodedToken = jwtDecode<JwtPayload>(accessToken);

          // Log decoded token for debugging
          console.log("Decoded Token:", decodedToken);
          console.log("Token Expiry:", new Date(decodedToken.exp * 1000));
          console.log("Current Time:", new Date());

          // Check if the access token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            if (refreshToken) {
              const success = await refreshAccessToken(refreshToken);
              if (!success) throw new Error("Token refresh failed");
            } else {
              throw new Error("Access token expired");
            }
          }

          if (storedUser) {
            const userInfo = JSON.parse(storedUser);
            setUser(userInfo);
            setTokens({ accessToken, refreshToken: refreshToken || "" });
          } else {
            const userInfo: UserProfile = {
              id: decodedToken["JWTID"],
              username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
              email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
              firstName: decodedToken["FirstName"],
              lastName: decodedToken["LastName"],
              role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            };
            setUser(userInfo);
            await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          }
        }
      } catch (error) {
        console.error("Initialization error:", error);
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        setUser(null);
        setTokens(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const refreshAccessToken = async (refreshToken?: string) => {
    if (!refreshToken) return false;

    try {
      const { data } = await axiosInstance.post<RefreshTokenResponse>(
        "/api/refresh-access-token",
        { refreshToken }
      );

      if (data.accessToken) {
        await AsyncStorage.setItem("accessToken", data.accessToken);

        const decodedToken = jwtDecode<JwtPayload>(data.accessToken);
        const userInfo: UserProfile = {
          id: decodedToken["JWTID"],
          username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          firstName: decodedToken["FirstName"],
          lastName: decodedToken["LastName"],
          role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };

        setUser(userInfo);
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken || refreshToken,
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh failed", error);
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      setUser(null);
      setTokens(null);
      return false;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      console.log("Logging in with credentials:", credentials);

      const { data } = await axiosInstance.post(`${API_URL}/api/Auth/login`, credentials);

      console.log("Login response data:", data);

      if (data.isSucceed) {
        const decodedToken = jwtDecode<JwtPayload>(data.accessToken);
        console.log("Decoded Token:", decodedToken);

        const userInfo: UserProfile = {
          id: decodedToken["JWTID"],
          username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          firstName: decodedToken["FirstName"],
          lastName: decodedToken["LastName"],
          role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };

        await AsyncStorage.multiSet([
          ["accessToken", data.accessToken],
          ["refreshToken", data.refreshToken],
          ["user", JSON.stringify(userInfo)],
        ]);

        setAuthToken(data.accessToken);
        setUser(userInfo);
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        return userInfo;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Login failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const { data } = await axiosInstance.post(`${API_URL}/api/Auth/register`, credentials);

      if (data.isSucceed) {
        if (data.accessToken && data.refreshToken) {
          await AsyncStorage.multiSet([
            ["accessToken", data.accessToken],
            ["refreshToken", data.refreshToken],
            ["user", JSON.stringify(data.user)],
          ]);
        } else {
          console.warn("No accessToken returned from API");
        }

        Alert.alert("Success", "Registration successful. Please log in.");
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error.response?.data?.message || error.message);
      Alert.alert("Error", error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(`${API_URL}/api/Auth/logout`);
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      setTokens(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, tokens, login, register, isLoading, logout, role: user?.role || null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
