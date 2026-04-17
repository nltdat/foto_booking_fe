import Axios, { type CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
  timeout: 10000
};

export const apiClient = Axios.create(axiosConfig);

export default apiClient;
