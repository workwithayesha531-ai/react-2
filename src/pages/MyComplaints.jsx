
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Eye, ClipboardList } from "lucide-react";
import { useState } from "react";

export default function MyComplaints() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [complaints] = useState(() => {
    const all = JSON.parse(
      localStorage.getItem("complaints") || "[]"
    );

    return all.filter(item => item.email === user.email);
  });

  const [selected, setSelected] = useState(null);

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-5 md:p-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Complaints
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            View and track all your submitted complaints.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            {complaints.length === 0 ? (
              <div className="text-center py-16">
                <ClipboardList
                  size={45}
                  className="mx-auto text-indigo-400 mb-4"
                />

                <h2 className="font-bold text-lg text-slate-700">
                  No Complaints Found
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  You haven't submitted any complaints yet.
                </p>
              </div>
            ) : (
              <table className="w-full text-left min-w-[650px]">
                <thead className="bg-slate-50 text-slate-600 text-sm">
                  <tr>
                    <th className="p-4">Complaint ID</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map(item => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="p-4 text-indigo-600 font-medium">
                        {item.id}
                      </td>

                      <td className="p-4 font-medium text-slate-700">
                        {item.title}
                      </td>

                      <td className="p-4 text-slate-600">
                        {item.category}
                      </td>

                      <td className="p-4 text-slate-600">
                        {item.date}
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[item.status]}`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => setSelected(item)}
                          className="flex items-center gap-1 text-indigo-600 font-semibold"
                        >
                          <Eye size={17} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {selected && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Complaint Details
                </h2>

                <div className="space-y-3 text-sm">
                  <p><b>ID:</b> {selected.id}</p>
                  <p><b>Title:</b> {selected.title}</p>
                  <p><b>Category:</b> {selected.category}</p>
                  <p><b>Priority:</b> {selected.priority}</p>
                  <p><b>Status:</b> {selected.status}</p>
                  <p><b>Date:</b> {selected.date}</p>
                  <p><b>Description:</b> {selected.description}</p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
