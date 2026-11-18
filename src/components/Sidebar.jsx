
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ClipboardList } from "lucide-react";

export default function Sidebar() {
  const links = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard },
    { to: "/submit-complaint", label: "Submit Complaint", icon: PlusCircle },
    { to: "/my-complaints", label: "My Complaints", icon: ClipboardList },
  ];

  return (
    <aside className="bg-white w-full md:w-64 p-5 border-r border-slate-200">
      <p className="text-xs font-bold text-slate-400 uppercase mb-4">
        Student Menu
      </p>

      <div className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-indigo-50"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
