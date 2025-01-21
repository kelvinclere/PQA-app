import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@env";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (formData: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (formData: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/Auth/register`, formData);
      if (response.data.isSucceed) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      throw new Error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/Auth/login`, credentials);
      if (response.data.isSucceed) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
