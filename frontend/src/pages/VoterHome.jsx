import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const VoterHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Voter Portal</h1>
          <p className="text-gray-500 mt-2">Access Your Portal</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg text-center transition duration-300"
          >
            Create an Account
          </Link>
          <Link
            to="/login"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300 shadow-md"
          >
            Login
          </Link>
        </div>
        <div className="mt-6">
          <Link
            to="/home"
            className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoterHome;
