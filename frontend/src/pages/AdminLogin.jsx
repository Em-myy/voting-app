import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "", secretKey: "" });
  const navigate = useNavigate();

  const { setAdmin } = useAdmin();

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
      localStorage.setItem("adminToken", res.data.token);
      setAdmin(res.data.admin);
      console.log("Login Successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error.response?.data?.msg || "You are not an admin");
    }
  };
  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Admin E-Mail"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Admin Password"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="secretKey"
          placeholder="Admin Secret Key"
          onChange={handleChange}
        />
        <button type="submit">Login To Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
