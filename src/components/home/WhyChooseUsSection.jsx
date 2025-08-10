import { Star, ShieldCheck, DollarSign } from "lucide-react";

export default function WhyChooseUsSection() {
  const items = [
    {
      icon: Star,
      title: "Trusted",
      desc: "Thousands of happy travelers book with us every year.",
    },
    {
      icon: DollarSign,
      title: "Affordable",
      desc: "Best prices with great deals and exclusive discounts.",
    },
    {
      icon: ShieldCheck,
      title: "Support",
      desc: "24/7 customer support ready to help your travel journey.",
    },
  ];

  return (
    <section className="w-full px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We provide the best travel experiences with handpicked activities,
        exclusive promos, and top-rated guides to make your journey
        unforgettable.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Icon className="mx-auto text-blue-600 mb-3" size={32} />
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
