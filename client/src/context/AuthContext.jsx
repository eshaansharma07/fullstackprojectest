import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage } from "../api/http.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("eventsphere_token"));
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    if (!localStorage.getItem("eventsphere_token")) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data);
    } catch (error) {
      localStorage.removeItem("eventsphere_token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (payload) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("eventsphere_token", data.data.token);
      setToken(data.data.token);
      setUser(data.data.user);
      toast.success("Welcome back to EventSphere");
      return data.data.user;
    } catch (error) {
      toast.error(extractErrorMessage(error));
      throw error;
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      localStorage.setItem("eventsphere_token", data.data.token);
      setToken(data.data.token);
      setUser(data.data.user);
      toast.success("Account created successfully");
      return data.data.user;
    } catch (error) {
      toast.error(extractErrorMessage(error));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("eventsphere_token");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      signup,
      logout,
      refreshUser: fetchMe,
      setUser
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
