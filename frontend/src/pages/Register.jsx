import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isText, setIsText] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const VOTER_TOAST_ID = "voter_register_configuration";

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleVisibility = () => {
    setIsText((prev) => !prev);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/authentication/register`,
        form,
      );

      toast.success("Registration successful", {
        id: VOTER_TOAST_ID,
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 3000,
      });

      setTimeout(() => {
        login(res.data.token);
        navigate("/vote");
      }, 4000);
    } catch (error) {
      toast.error("Registration Failed", {
        id: VOTER_TOAST_ID,
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 5000,
      });
    }
  };
  return (
    <div className="p-2">
      <Toaster />
      <div className="mb-8 md:mb-2">
        <Navbar />
      </div>

      <div className="flex h-[50vh] items-center justify-center p-2">
        <div className="w-[100%] md:w-[50%] border-2 px-[10px] md:px-[40px] py-[15px] md:py-[50px] mt-[100px] md:mt-[200px] border-gray-300">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-6xl text-center mb-8">Register</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-[24px]">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[24px]">E-Mail</label>
                <input
                  name="email"
                  type="email"
                  placeholder="E-Mail"
                  onChange={handleChange}
                  className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[24px]">Password</label>
                <div className="border-2 border-gray-300 flex">
                  <input
                    name="password"
                    type={isText ? "text" : "password"}
                    onChange={handleChange}
                    className="text-black text-[22px] focus:outline-none p-2 w-[100%]"
                  />
                  <button
                    onClick={handleVisibility}
                    type="button"
                    className="cursor-pointer md:text-2xl pr-2"
                  >
                    {isText ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="text-[26px] bg-blue-800 text-white py-2 mt-2 cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
          <Link
            to="/voterHome"
            className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition mt-4"
          >
            <FaArrowLeft />
            <span>Back to Voter Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
