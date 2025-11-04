import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/adminRegister">Admin Register</Link>
      <Link to="/adminLogin">Admin Login</Link>
      {user ? (
        <>
          <Link to="/vote">Vote</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
