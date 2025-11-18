import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="text-[24px] p-2">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-10">
        <div className="text-[#2F46F5] dark:text-[#CEE8F5] flex flex-col md:flex-row items-center gap-x-4">
          <Link
            to="/"
            className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
          >
            About
          </Link>
        </div>

        {user ? (
          <>
            <Link to="/vote">Vote</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <div className="text-[#2F46F5] dark:text-[#CEE8F5] flex flex-col md:flex-row gap-x-4 items-center">
            <Link
              to="/register"
              className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
            >
              Login
            </Link>
          </div>
        )}
        <div className="text-[#2F46F5] dark:text-[#CEE8F5] flex flex-col md:flex-row gap-x-4 items-center">
          <Link
            to="/adminRegister"
            className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
          >
            Admin Register
          </Link>

          <Link
            to="/adminLogin"
            className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
