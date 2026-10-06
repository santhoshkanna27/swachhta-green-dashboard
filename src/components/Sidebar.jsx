import {
  LayoutDashboard,
  ClipboardList,
  SearchCheck,
  ShieldCheck,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <h2>Swachhta</h2>
        <p>Green Compliance</p>
      </div>


      <nav className="sidebar-nav">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>


        <NavLink
          to="/standards"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <ClipboardList size={18} />
          Standards
        </NavLink>


        <NavLink
          to="/inspections"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <SearchCheck size={18} />
          Inspections
        </NavLink>


        <NavLink
          to="/compliance"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <ShieldCheck size={18} />
          Compliance
        </NavLink>


        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FileText size={18} />
          Reports
        </NavLink>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>


      <div className="sidebar-bottom">

        <div className="sidebar-user">

          <div className="sidebar-user-info">
            <strong>{user?.name}</strong>
            <span>Administrator</span>
          </div>

        </div>


        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;