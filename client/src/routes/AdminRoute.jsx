import { Routes, Route } from "react-router-dom";
import AdminPanel from "../../admin/pages/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";


export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
            <Route path="/admin/*" element={<AdminPanel />} />
            </Route>
        </Routes>
    );
}