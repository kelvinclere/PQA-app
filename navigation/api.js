import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-endpoint.com",
});

export const fetchQuestions = async () => {
  const response = await api.get("/questions");
  return response.data;
};
