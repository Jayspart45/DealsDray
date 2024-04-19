import axios from "axios";

export const IP = import.meta.env.IP || "localhost";
export const PORT = import.meta.env.PORT || 8000;

export const BACKEND_API = axios.create({
  baseURL: `http://${IP}:${PORT}`,
});

export const setAuthToken = (token) => {
  if (token) {
    BACKEND_API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete BACKEND_API.defaults.headers.common["Authorization"];
  }
};
