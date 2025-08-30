import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * - Membatasi akses ke route berdasarkan status login dan role user
 * @param {ReactNode} children - Component yang akan dirender jika akses valid
 * @param {string} role - Role yang diperbolehkan (misal: "admin")
 */
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useSelector((state) => state.auth);

  // Jika sedang memuat data user, tampilkan loading
  if (loading) return <div>Loading...</div>;

  // Jika user belum login, redirect ke login
  if (!user) return <Navigate to="/login" replace />;

  // Jika role ditentukan dan user tidak sesuai, redirect ke home
  if (role && user.role !== role) return <Navigate to="/" replace />;

  // Jika valid, render component children
  return children;
}
