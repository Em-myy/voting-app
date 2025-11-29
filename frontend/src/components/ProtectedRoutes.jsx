import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
