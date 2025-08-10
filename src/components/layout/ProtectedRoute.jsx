// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // kalau belum login
  if (!user) {
    // tetap bisa lihat Home
    if (location.pathname === "/") {
      return children;
    }
    // akses lain dilempar ke Home
    return <Navigate to="/" replace />;
  }

  // cek role (opsional)
  if (roles) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
