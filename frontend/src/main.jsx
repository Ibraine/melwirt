import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import "./styles/global.css";
import "./styles/admin-theme.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // 👈 Import AuthProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* 👈 Wrap App inside AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);

