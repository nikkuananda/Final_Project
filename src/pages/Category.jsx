import { useEffect, useState } from "react";
import api from "../lib/api";
import { useParams } from "react-router-dom";

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        setCategory(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, [id]);

  if (!category) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p>{category.description}</p>
    </div>
  );
}
