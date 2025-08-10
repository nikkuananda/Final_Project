// src/components/auth/RegisterSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterSuccess({ message }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <p className="text-green-600 text-sm mb-3 text-center">
      {message || "🎉 Berhasil Register! Mengarahkan ke login..."}
    </p>
  );
}
