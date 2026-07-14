import { Routes, Route } from "react-router-dom";
import AdminPanel from "../../admin/pages/AdminPanel";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
    );
}