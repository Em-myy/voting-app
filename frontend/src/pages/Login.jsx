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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
  );
};

export default Login;
