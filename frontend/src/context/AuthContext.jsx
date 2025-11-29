import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (token, user) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setIsInitialized(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsInitialized(false);
  };

  useEffect(() => {
    if (isInitialized) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setIsInitialized(true);
      setLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://localhost:3000/api/authentication/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => {
        setIsInitialized(true);
        setLoading(false);
      });
  }, [isInitialized]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
