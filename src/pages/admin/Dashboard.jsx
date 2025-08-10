import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api"; // axios instance
import {
  Users,
  Receipt,
  Map,
  Ticket,
  LayoutDashboard,
  Image,
  FolderTree,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    activities: 0,
    promos: 0,
    banners: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        // ambil semua data
        const [usersRes, trxRes, actRes, promoRes, bannerRes, catRes] =
          await Promise.all([
            api.get("/all-user"),
            api.get("/all-transactions"),
            api.get("/activities"),
            api.get("/promos"),
            api.get("/banners"),
            api.get("/categories"),
          ]);

        setStats({
          users: usersRes.data?.data?.length || 0,
          transactions: trxRes.data?.data?.length || 0,
          activities: actRes.data?.data?.length || 0,
          promos: promoRes.data?.data?.length || 0,
          banners: bannerRes.data?.data?.length || 0,
          categories: catRes.data?.data?.length || 0,
        });
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
        setError("Failed to load statistics. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // menu cards (sesuai navbar admin)
  const cards = [
    {
      label: "Users",
      value: stats.users,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      path: "/admin/users",
    },
    {
      label: "Transactions",
      value: stats.transactions,
      icon: <Receipt className="w-8 h-8 text-green-600" />,
      path: "/admin/transactions",
    },
    {
      label: "Activities",
      value: stats.activities,
      icon: <Map className="w-8 h-8 text-purple-600" />,
      path: "/admin/activities",
    },
    {
      label: "Promos",
      value: stats.promos,
      icon: <Ticket className="w-8 h-8 text-orange-600" />,
      path: "/admin/promos",
    },
    {
      label: "Banners",
      value: stats.banners,
      icon: <Image className="w-8 h-8 text-pink-600" />,
      path: "/admin/banners",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: <FolderTree className="w-8 h-8 text-teal-600" />,
      path: "/admin/categories",
    },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-10 flex items-center gap-3 text-gray-800">
        <LayoutDashboard className="w-8 h-8 text-blue-600" />
        Admin Dashboard
      </h1>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.label}
              onClick={() => navigate(c.path)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center justify-center text-center hover:scale-105"
            >
              {c.icon}
              <h2 className="mt-3 text-2xl font-bold">
                {c.value !== undefined ? c.value : "-"}
              </h2>
              <p className="text-gray-500">{c.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
