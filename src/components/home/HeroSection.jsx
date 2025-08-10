import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ banners }) {
  const navigate = useNavigate();
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return null;

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[400px] md:h-[500px]">
      <img
        src={
          banners[bannerIndex].imageUrl ||
          "https://source.unsplash.com/1600x900/?travel,holiday"
        }
        alt={banners[bannerIndex].title || "banner"}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Discover Your Next Adventure
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-6 drop-shadow-md">
          Find the best activities, tours, and deals to make your journey
          unforgettable.
        </p>
        <button
          onClick={() => navigate("/activities")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
        >
          Book Now
        </button>
      </div>
    </section>
  );
}
