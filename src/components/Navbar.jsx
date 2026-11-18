
import { ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-indigo-700">
        <ShieldCheck size={28} />
        <h1 className="text-xl font-bold">ResolveIT</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 hidden sm:block">
          {user.email}
        </span>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}
