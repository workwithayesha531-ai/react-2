
export default function ComplaintCard({ complaint }) {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between gap-3">
        <h3 className="font-bold text-slate-800">
          {complaint.title}
        </h3>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[complaint.status] || "bg-slate-100 text-slate-600"}`}>
          {complaint.status}
        </span>
      </div>

      <p className="text-sm text-slate-500 mt-2">
        {complaint.category}
      </p>

      <p className="text-slate-600 mt-3 text-sm">
        {complaint.description}
      </p>
    </div>
  );
}
