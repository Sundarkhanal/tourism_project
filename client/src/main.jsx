import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from 'sonner';
import { APIProvider } from "@vis.gl/react-google-maps";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <App />
    <Toaster position="top-right" richColors />
    </APIProvider>
  </React.StrictMode>
);