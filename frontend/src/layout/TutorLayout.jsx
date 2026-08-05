// src/layout/TutorLayout.jsx
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const TutorLayout = () => {
  const { user } = useContext(AuthContext);

  // IMPORTANT: force the layout role to "tutor" (this prevents admin sidebar/header
  // from showing if AuthContext isn't fully loaded or contains stale data).
  const role = "tutor";

  // Use user details only for display (name/email) not for choosing layout role
  const userName = user?.full_name || user?.name || "Tutor User";

  return (
    <div className="app-container">
      <Sidebar role={role} userName={userName} />
      <div className="content-area">
        <Header role={role} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TutorLayout;
