import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [isText, setIsText] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const ADMIN_TOAST_ID = "admin_register_configuration";

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
      const res = await axios.post(`${API_URL}/api/admin/register`, form);

      toast.success("Registration successful", {
        id: ADMIN_TOAST_ID,
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/admin");
      }, 4000);
    } catch (error) {
      toast.error("Admin Registration failed", {
        id: ADMIN_TOAST_ID,
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 5000,
      });
    }
  };
  return (
    <div className="p-2">
      <Toaster />
      <div className="dark:bg-slate-500 bg-slate-200 rounded-tl-[100px] rounded-br-[100px] md:rounded-tr-[100px] md:rounded-bl-[100px] md:py-[25px] mt-4">
        <Navbar />
      </div>
      <div className="flex h-[50vh] items-center justify-center p-2">
        <div className="w-[100%] md:w-[50%] border-2 px-[10px] md:px-[40px] py-[15px] md:py-[50px] mt-[250px] md:mt-[400px] border-gray-300">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-6xl text-center mb-8">
              Admin Register
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-[24px]">Admin Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Admin Name"
                  onChange={handleChange}
                  className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[24px]">Admin E-Mail:</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Admin E-Mail"
                  onChange={handleChange}
                  className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[24px]">Admin Password:</label>
                <div className="border-2 border-gray-300 flex">
                  <input
                    type={isText ? "text" : "password"}
                    name="password"
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

              <div className="flex flex-col">
                <label className="text-[24px]">Admin Secret Key:</label>
                <input
                  type="text"
                  name="secretKey"
                  placeholder="Admin Secret Key"
                  onChange={handleChange}
                  className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
                />
              </div>

              <button
                type="submit"
                className="text-[26px] bg-black text-white py-2 mt-2 cursor-pointer"
              >
                Register Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
