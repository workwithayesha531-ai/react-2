
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      email,
      role
    }));

    navigate(role === "admin" ? "/admin" : "/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-between bg-indigo-700 text-white p-12">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={35} />
              <h1 className="text-2xl font-bold">ResolveIT</h1>
            </div>

            <h2 className="text-4xl font-bold mt-20 leading-tight">
              Your Voice Matters.
              <br />
              We Make It Happen.
            </h2>

            <p className="text-indigo-100 mt-6 leading-7">
              A smart complaint management system designed
              to make campus services better and faster.
            </p>
          </div>

          <p className="text-sm text-indigo-200">
            © 2026 ResolveIT. All rights reserved.
          </p>
        </div>

        <div className="p-8 md:p-12">
          <div className="md:hidden flex items-center gap-2 text-indigo-700 mb-8">
            <ShieldCheck size={30} />
            <h1 className="text-2xl font-bold">ResolveIT</h1>
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back!
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Sign in to access your account.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-7">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${
                role === "student"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              <GraduationCap size={25} />
              <span className="font-semibold">Student</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${
                role === "admin"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              <ShieldCheck size={25} />
              <span className="font-semibold">Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <label className="text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center border border-slate-300 rounded-xl px-4 mt-2 mb-5 focus-within:border-indigo-600">
              <Mail size={19} className="text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>

            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center border border-slate-300 rounded-xl px-4 mt-2 mb-5 focus-within:border-indigo-600">
              <Lock size={19} className="text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 outline-none bg-transparent"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-indigo-200"
            >
              Login as {role === "admin" ? "Admin" : "Student"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Secure Campus Complaint Management System
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
