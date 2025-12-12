import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isText, setIsText] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const VOTER_TOAST_ID = "voter_register_configuration";

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
        "http://localhost:3000/api/authentication/register",
        form
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
      <div className="dark:bg-zinc-500 bg-zinc-200 rounded-tl-[100px] rounded-br-[100px] md:rounded-tr-[100px] md:rounded-bl-[100px] md:py-[25px] mt-4">
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
                className="text-[26px] bg-black text-white py-2 mt-2 cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
