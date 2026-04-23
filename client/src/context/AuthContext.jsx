import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage, setAuthToken } from "../api/http.js";

const AuthContext = createContext(null);

const getStoredToken = () => {
  try {
    return localStorage.getItem("eventsphere_token");
  } catch {
    return null;
  }
};

const storeToken = (token) => {
  try {
    if (token) {
      localStorage.setItem("eventsphere_token", token);
    } else {
      localStorage.removeItem("eventsphere_token");
    }
  } catch {
    // Keep the session alive in memory even if storage access is flaky.
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken());
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const activeToken = token || getStoredToken();
    setAuthToken(activeToken);

    if (!activeToken) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data);
    } catch (error) {
      storeToken(null);
      setAuthToken(null);
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async (payload) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      storeToken(data.data.token);
      setAuthToken(data.data.token);
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
      storeToken(data.data.token);
      setAuthToken(data.data.token);
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
    storeToken(null);
    setAuthToken(null);
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
