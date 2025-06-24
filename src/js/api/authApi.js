import axiosInstance from "./axiosInstance";

export async function registerUser({ name, email, password }) {
  const res = await axiosInstance.post("/register", { name, email, password });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await axiosInstance.post("/login", { email, password });
  return res.data;
}
