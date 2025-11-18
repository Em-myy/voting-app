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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="flex flex-col gap-2">
          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="bg-zinc-500 text-white focus:outline-none"
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="E-Mail"
              onChange={handleChange}
              className="bg-zinc-500 text-white focus:outline-none"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="bg-zinc-500 text-white focus:outline-none"
            />
          </div>
          <button type="submit">Register</button>
          <p>{msg}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
