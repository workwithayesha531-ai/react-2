
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ComplaintCard from "../components/ComplaintCard";
import {
  ClipboardList,
  Clock,
  LoaderCircle,
  CheckCircle,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const allComplaints = JSON.parse(
    localStorage.getItem("complaints") || "[]"
  );

  const complaints = allComplaints.filter(
    (item) => item.email === user.email
  );

  const pending = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: ClipboardList,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: LoaderCircle,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-5 md:p-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">
                STUDENT PORTAL
              </p>

              <h1 className="text-3xl font-bold text-slate-800 mt-2">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Welcome back, {user.email || "Student"}!
              </p>
            </div>

            <Link
              to="/submit-complaint"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <Plus size={20} />
              New Complaint
            </Link>
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

                      <h2 className="text-3xl font-bold text-slate-800 mt-3">
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

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Recent Complaints
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your latest submitted complaints
                </p>
              </div>

              <Link
                to="/my-complaints"
                className="text-indigo-600 font-semibold text-sm flex items-center gap-1"
              >
                View All <ArrowRight size={17} />
              </Link>
            </div>

            {complaints.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList
                    size={30}
                    className="text-indigo-600"
                  />
                </div>

                <h3 className="font-bold text-slate-700">
                  No Complaints Yet
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  You haven't submitted any complaints.
                </p>

                <Link
                  to="/submit-complaint"
                  className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-lg"
                >
                  Submit Your First Complaint
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.slice(-3).reverse().map((complaint) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                  />
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
