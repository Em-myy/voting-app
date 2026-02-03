import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="text-[28px] p-2 font-semibold">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-10">
        <div className="text-[#2F46F5] dark:text-yellow-600 flex flex-col md:flex-row items-center gap-x-4">
          <Link to="/" className="hover:text-yellow-700">
            Home
          </Link>

          <Link to="/about" className="hover:text-yellow-700">
            About
          </Link>
        </div>

        {user ? (
          <>
            <div className="text-[#2F46F5] dark:text-[#CEE8F5] flex flex-col md:flex-row items-center gap-x-4">
              <Link to="/vote" className="hover:text-yellow-600 ">
                Vote
              </Link>

              <button
                onClick={logout}
                className="hover:text-yellow-600 hover:underline hover:decoration-wavy hover:decoration-red-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
