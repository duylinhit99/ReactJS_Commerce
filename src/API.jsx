import axios from "axios";
import { API_PUBLIC_BASE } from "./config";

const API = axios.create({
  baseURL: `${API_PUBLIC_BASE}/api`,
});

export default API;
