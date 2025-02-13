import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://bd1f-41-76-168-3.ngrok-free.app";

export default function useUsersData() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/User/all/users`);
        return response?.data?.users || [];
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err.message ||
          "Error fetching users data";
        throw new Error(message);
      }
    },
  });
}