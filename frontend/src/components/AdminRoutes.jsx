import { useAdmin } from "../context/AdminContext";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { admin } = useAdmin();
  return admin ? children : <Navigate to="/adminLogin" />;
};

export default AdminRoutes;
