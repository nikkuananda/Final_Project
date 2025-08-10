import { Star } from "lucide-react";

export default function ReviewsSection({ reviews }) {
  if (!reviews.length) return null;

  return (
    <section className="w-full px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Travelers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < rev.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">"{rev.comment}"</p>
            <p className="font-semibold text-gray-800">- {rev.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
