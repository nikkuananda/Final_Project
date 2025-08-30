import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../store/slices/bannerSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { fetchActivities } from "../store/slices/activitySlice";
import HeroSearch from "../components/HeroSearch";
import ActivityCard from "../components/ActivityCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const banners = useSelector((s) => s.banners.items || []);
  const categories = useSelector((s) => s.categories.items || []);
  const activities = useSelector((s) => s.activities.items || []);

  // state untuk index banner saat ini
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchCategories());
    dispatch(fetchActivities({}));
  }, [dispatch]);

  // auto rotate banner setiap 5 detik
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const handleCategoryClick = (cat) => {
    navigate(`/categories/${cat.id}`);
  };

  const handleSearch = ({ keyword, categoryId }) => {
    dispatch(fetchActivities({ keyword, categoryId }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero dengan search dan banner */}
      <section className="relative">
        {/* Background Banner */}
        {banners.length > 0 && (
          <img
            src={banners[bannerIndex].imageUrl}
            alt={banners[bannerIndex].title || "banner"}
            className="absolute inset-0 w-full h-[380px] object-cover -z-10"
          />
        )}

        <div className="h-[380px] flex items-center">
          <div className="container">
            <HeroSearch banners={banners} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Categories */}
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="p-4 bg-white rounded-xl shadow text-center cursor-pointer hover:scale-105 hover:shadow-lg transition transform duration-300"
            >
              <img
                src={cat.imageUrl || "/placeholder.png"}
                alt={cat.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover mx-auto mb-2 rounded-full"
              />
              <p className="text-sm sm:text-base md:text-lg font-medium">
                {cat.name}
              </p>
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
