import { Link } from "react-router-dom";

export default function Dashboard() {
  const menus = [
    { path: "/admin/banners", label: "Banners" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/activities", label: "Activities" },
    { path: "/admin/promos", label: "Promos" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menus.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <h2 className="font-semibold text-lg">{m.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
