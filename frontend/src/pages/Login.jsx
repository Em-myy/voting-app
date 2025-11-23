import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
        "http://localhost:3000/api/authentication/login",
        form
      );
      login(res.data.token);
      navigate("/vote");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Error logging in");
    }
  };
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="w-[50%] border-2 px-[40px] py-[50px] mt-[200px] border-gray-300">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-6xl text-center">Sign In</h2>
            <h2>Access Your Account</h2>
          </div>
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            onChange={handleChange}
          />
          <input name="password" type="password" onChange={handleChange} />
          <button type="submit">Login</button>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
