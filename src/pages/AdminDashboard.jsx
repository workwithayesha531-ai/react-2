
import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Search,
  Trash2,
  ClipboardList,
  Clock,
  CheckCircle,
  LoaderCircle,
  Filter
} from "lucide-react";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState(() =>
    JSON.parse(localStorage.getItem("complaints") || "[]")
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const saveComplaints = (updated) => {
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  const updateStatus = (id, status) => {
    const updated = complaints.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    saveComplaints(updated);
  };

  const deleteComplaint = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    saveComplaints(complaints.filter((item) => item.id !== id));
  };

  const filtered = complaints.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: ClipboardList,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      title: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "In Progress",
      value: complaints.filter((c) => c.status === "In Progress").length,
      icon: LoaderCircle,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Resolved",
      value: complaints.filter((c) => c.status === "Resolved").length,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-5 md:p-8 max-w-7xl mx-auto">

        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-semibold">
            ADMINISTRATION PANEL
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and monitor all student complaints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3 text-slate-800">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`p-4 rounded-xl ${stat.color}`}>
                    <Icon size={25} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">

          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              All Complaints
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl px-3">
                <Search size={19} className="text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search complaints..."
                  className="p-2 outline-none w-full sm:w-48"
                />
              </div>

              <div className="flex items-center border border-slate-300 rounded-xl px-3">
                <Filter size={18} className="text-slate-400" />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 outline-none bg-transparent"
                >
                  <option value="All">All Categories</option>
                  <option value="IT">IT</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-14">
              <ClipboardList
                size={45}
                className="mx-auto text-indigo-400 mb-4"
              />

              <h3 className="font-bold text-lg text-slate-700">
                No Complaints Found
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                There are no complaints matching your search.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-slate-600 text-sm">
                  <tr>
                    <th className="p-4">Complaint ID</th>
                    <th className="p-4">Student Email</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">

                      <td className="p-4 text-indigo-600 font-medium">
                        {item.id}
                      </td>

                      <td className="p-4 text-slate-600">
                        {item.email}
                      </td>

                      <td className="p-4 font-medium text-slate-700">
                        {item.title}
                      </td>

                      <td className="p-4 text-slate-600">
                        {item.category}
                      </td>

                      <td className="p-4 text-slate-600">
                        {item.priority}
                      </td>

                      <td className="p-4">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(item.id, e.target.value)
                          }
                          className="border border-slate-200 rounded-lg p-2 text-sm outline-none"
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => deleteComplaint(item.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                          title="Delete complaint"
                        >
                          <Trash2 size={19} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
