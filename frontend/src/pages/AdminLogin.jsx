import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "", secretKey: "" });
  const navigate = useNavigate();
  const [isText, setIsText] = useState(false);

  const { setAdmin } = useAdmin();

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
        "http://localhost:3000/api/admin/login",
        form
      );

      toast.success("Sign In successful", {
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 3000,
      });

      setTimeout(() => {
        localStorage.setItem("adminToken", res.data.token);
        setAdmin(res.data.admin);
        navigate("/admin");
      }, 4000);
    } catch (error) {
      toast.error("Sign In Failed, Likely Not an Admin ", {
        className: "md:text-2xl mr-4",
        position: "bottom-right",
        duration: 5000,
      });
    }
  };
  return (
    <div>
      <Toaster />
      <div className="dark:bg-slate-500 bg-slate-200 rounded-tl-[100px] rounded-br-[100px] md:rounded-tr-[100px] md:rounded-bl-[100px] md:py-[25px] mt-4">
        <Navbar />
      </div>
      <div className="flex h-[50vh] items-center justify-center p-2">
        <div className="w-[100%] md:w-[50%] border-2 px-[10px] md:px-[40px] py-[15px] md:py-[50px] mt-[200px] md:mt-[250px] border-gray-300">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h1 className="text-3xl md:text-6xl text-center mb-2">
                Admin Login
              </h1>
              <h1 className="text-1xl md:text-2xl text-center">
                Access your account
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-[24px]">Admin E-Mail:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Admin E-Mail"
                  required
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
                    value={form.password}
                    required
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
                <label className="text-[24px]">Admin Secret Key</label>
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
                Login To Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
