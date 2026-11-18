
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SubmitComplaint() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("IT");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const complaints = JSON.parse(
      localStorage.getItem("complaints") || "[]"
    );

    const newComplaint = {
      id: "CMP" + Date.now(),
      email: user.email,
      title,
      category,
      description,
      priority,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    localStorage.setItem(
      "complaints",
      JSON.stringify([...complaints, newComplaint])
    );

    setMessage("Complaint submitted successfully!");

    setTimeout(() => {
      navigate("/my-complaints");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-5 md:p-8">
          <Link
            to="/student"
            className="flex items-center gap-2 text-indigo-600 mb-6"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800">
              Submit a Complaint
            </h1>

            <p className="text-slate-500 mt-2 mb-8">
              Tell us about the issue you are facing.
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  Complaint Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter complaint title"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Category *
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-600"
                  >
                    <option>IT</option>
                    <option>Electricity</option>
                    <option>Water</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Priority *
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-600"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  Description *
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your complaint in detail..."
                  rows="5"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              {message && (
                <p className={`text-sm font-medium ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3.5 rounded-xl flex justify-center items-center gap-2 transition"
              >
                <Send size={19} />
                Submit Complaint
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
