import PromoHeader from "../components/promo/PromoHeader";
import PromoInfo from "../components/promo/PromoInfo";
import usePromoDetail from "../hooks/usePromoDetail";

export default function PromoDetail() {
  const { promo, loading, error } = usePromoDetail();

  if (loading) return <p>Loading promo detail...</p>;
  if (error) return <p className="text-red-500">Error loading promo.</p>;
  if (!promo) return <p>Promo not found</p>;

  return (
    <div>
      <PromoHeader promo={promo} />
      <div className="px-6">
        <PromoInfo promo={promo} />
      </div>
    </div>
  );
}
