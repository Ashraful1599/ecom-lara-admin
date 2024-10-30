// lib/auth.ts
import axios from "axios";
import Cookies from "js-cookie";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      { email, password },
    );
    const { token } = response.data;

    // Store token in cookies
    Cookies.set("authToken", token, { path: "/", sameSite: "Strict" });
    return token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = Cookies.get("authToken");
    if (token) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      Cookies.remove("authToken");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const isAuthenticated = () => !!Cookies.get("authToken");
