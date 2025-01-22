import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import { BASE_URL } from "@env"; 

export default function useUsersData() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/User/all/users`);
        return response?.data?.users || [];
      } catch (error) {
        throw new Error("Error fetching users data");
      }
    },
  });

  return {
    isLoading,
    error,
    data,
  };
}
