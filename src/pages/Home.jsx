import { useNavigate } from "react-router-dom";

// components
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import PromoSection from "../components/home/PromoSection";
import ActivitiesSection from "../components/home/ActivitiesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import ContactUsSection from "../components/home/ContactUsSection";

// hook
import useHome from "../hooks/useHome";

export default function Home() {
  const navigate = useNavigate();
  const {
    banners,
    categories,
    categoryLoading,
    activities,
    activityLoading,
    promos,
    promoLoading,
  } = useHome();

  const reviews = [
    {
      id: 1,
      name: "Andi Pratama",
      rating: 5,
      comment: "Layanannya luar biasa!",
    },
    {
      id: 2,
      name: "Siti Aminah",
      rating: 4,
      comment: "Harga terjangkau, aktivitasnya seru!",
    },
    {
      id: 3,
      name: "Budi Santoso",
      rating: 5,
      comment: "Customer support fast respon!",
    },
  ];

  const handleCategoryClick = (cat) => {
    navigate(`/activities?categoryId=${cat.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection banners={banners} />
      <main className="flex-1">
        <CategoriesSection
          categories={categories}
          loading={categoryLoading}
          onCategoryClick={handleCategoryClick}
        />
        <PromoSection
          promos={promos}
          loading={promoLoading}
          navigate={navigate}
        />
        <ActivitiesSection
          activities={activities}
          loading={activityLoading}
          navigate={navigate}
        />
        <WhyChooseUsSection />
        <ReviewsSection reviews={reviews} />
        <ContactUsSection />
      </main>
    </div>
  );
}
