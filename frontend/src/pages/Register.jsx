import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

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
      login(res.data.token);
      navigate("/vote");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Registeration Failed");
    }
  };
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="w-[50%] border-2 px-[40px] py-[50px] mt-[200px] border-gray-300">
        <form onSubmit={handleSubmit}>
          <h1 className="text-6xl text-center mb-8">Register</h1>
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
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="text-black text-[22px] focus:outline-none border-2 border-gray-300 p-2"
              />
            </div>
            <button
              type="submit"
              className="text-[26px] bg-black text-white py-2 mt-2"
            >
              Register
            </button>
            <p>{msg}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
