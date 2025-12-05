import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setAdmin(token);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate("/login");
  };
  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout, loading }}>
      {!loading && children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
