import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../store/slices/bannerSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { fetchActivities } from "../store/slices/activitySlice";
import HeroSearch from "../components/HeroSearch";
import ActivityCard from "../components/ActivityCard";

export default function Home() {
  const dispatch = useDispatch();

  const banners = useSelector((s) => s.banners.items);
  const categories = useSelector((s) => s.categories.items || []);
  const activities = useSelector((s) => s.activities.items || []);

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchCategories());
    dispatch(fetchActivities());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSearch banners={banners} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories */}
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 bg-white rounded-xl shadow text-center cursor-pointer hover:scale-105 transition"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-16 h-16 object-cover mx-auto mb-2"
              />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Popular Activities */}
        <h2 className="text-2xl font-bold mb-4">Popular Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.slice(0, 6).map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      </div>
    </div>
  );
}
