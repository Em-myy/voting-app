import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Vote from "./pages/Vote";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import HomeDashboard from "./pages/HomeDashboard";
import VoterHome from "./pages/VoterHome";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/voterHome" element={<VoterHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route
            path="/admin"
            element={
              <AdminRoutes>
                <Admin />
              </AdminRoutes>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoutes>
                <Vote />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
