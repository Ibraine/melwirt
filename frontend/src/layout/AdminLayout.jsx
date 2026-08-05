import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "admin";
  const userName = user?.full_name || "Admin User";

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

export default AdminLayout;
