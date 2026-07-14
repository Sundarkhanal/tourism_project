import { BrowserRouter } from "react-router-dom";
import ClientRoutes from "./routes/ClientRoute";
import AdminRoutes from "./routes/AdminRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <ClientRoutes />
            <AdminRoutes />
        </BrowserRouter>
    );
}

export default App;