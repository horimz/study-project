import axios from "axios";
import { storage } from "../storage";

let host;

if (process.env.NODE_ENV === "development") {
  host = "/";
} else {
  host = process.env.REACT_APP_API_HOST || "/";
}

const token = storage.getItem("TOKEN") || false;

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}` }
});

// Alter defaults after instance has been created
// apiClient.defaults.headers.common['Authorization'] = token;

export { apiClient };
