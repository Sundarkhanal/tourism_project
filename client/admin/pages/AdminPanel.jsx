import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "../components/AdminDashboard";
import DestinationManager from "../components/DestinationManager";
import BlogManager from "../components/BlogManager";
import NewsManager from "../components/NewsManager";
import UserManager from "../components/UserManager";

function AdminPanel() {

    const [active, setActive] = useState("dashboard");
  return (
    <div className="flex min-h-screen">

            <AdminSidebar
                active={active}
                onChange={setActive}
            />

            <div className="flex-1 p-8">

                {active === "dashboard" && <Dashboard />}
                {active === "users" && <UserManager />}
                {active === "news" && <NewsManager />}
                {active === "blog" && <BlogManager />}
                {active === "destinations" && <DestinationManager />}

            </div>

        </div>
  );
}

export default AdminPanel;