import { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";

import api from "../../src/api/axios";

import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "../components/AdminDashboard";
import DestinationManager from "../components/DestinationManager";
import BlogManager from "../components/BlogManager";
import NewsManager from "../components/NewsManager";
import ReviewManager from "../components/ReviewManager";

function AdminPanel() {
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/me");

        if (res.data.data.role !== "admin") {
          navigate("/");
          return;
        }

        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
  };

  checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active={active} onChange={setActive} />
      
      <div className="flex-1 p-8">
        {active === "dashboard" && <Dashboard />}
        {active === "reviews" && <ReviewManager />}
        {active === "news" && <NewsManager />}
        {active === "blog" && <BlogManager />}
        {active === "destinations" && <DestinationManager />}
      </div>
    </div>
  );
}

export default AdminPanel;
