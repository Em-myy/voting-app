import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-500 mt-2">Please select your portal</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to="/voterHome"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300"
          >
            Voter Access
          </Link>
          <Link
            to="/adminHome"
            className="block w-full bg-gray-600 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300"
          >
            Admin Dashboard
          </Link>
        </div>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition mt-4"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeDashboard;
