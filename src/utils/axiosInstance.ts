// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer 1|WQ3pu2JaAHUnXDVpNnwtU2saXEBRzW8ERPznZYcA14a53eda`,
  },
});

export default axiosInstance;
