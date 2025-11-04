import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setAdmin({ token });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate("/");
  };
  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
