import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/register",
        form
      );
      setMsg(res.data.msg);
      console.log("Admin registered successfully");
      navigate("/admin");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Registeration Failed");
    }
  };
  return (
    <div>
      <h1>Admin Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Admin E-Mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="secretKey"
          placeholder="Admin Secret Key"
          onChange={handleChange}
        />

        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister;
