import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  SearchCheck,
  ShieldCheck,
  FileText,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Swachhta</h2>
        <p>Green Compliance</p>
      </div>

      <nav className="sidebar-nav">
      <Link to="/" className="active">
  <LayoutDashboard size={18} />
  Dashboard
</Link>
        <Link to="/standards">
  <ClipboardList size={18} />
  Standards
</Link>
        <Link to="/inspections">
  <SearchCheck size={18} />
  Inspections
</Link>
       <Link to="/compliance">
  <ShieldCheck size={18} />
  Compliance
</Link>
        <Link to="/reports">
  <FileText size={18} />
  Reports
</Link>

<Link to="/settings">
  <Settings size={18} />
  Settings
</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
        