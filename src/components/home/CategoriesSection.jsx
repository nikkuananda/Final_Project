import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CategoriesSection({
  categories,
  loading,
  onCategoryClick,
}) {
  if (loading) return <p>Loading categories...</p>;
  if (!categories.length) return <p>No categories available</p>;

  return (
    <section className="w-full px-6 py-16">
      <p className="text-sm text-gray-500 uppercase mb-2">Browse by Category</p>
      <h2 className="text-3xl font-bold mb-8">Categories</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        navigation
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div
              onClick={() => onCategoryClick(cat)}
              className="p-4 bg-white rounded-2xl shadow cursor-pointer text-center hover:scale-105 hover:shadow-lg transition duration-300"
            >
              <img
                src={
                  cat.imageUrl ||
                  "https://source.unsplash.com/200x200/?adventure,landscape"
                }
                alt={cat.name}
                className="w-20 h-20 object-cover mx-auto mb-3 rounded-full"
              />
              <p className="font-medium">{cat.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
