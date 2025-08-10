import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Promos from "./pages/Promos";
import PromoDetail from "./pages/PromoDetail";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import BannersCRUD from "./pages/admin/BannersCRUD";
import CategoriesCRUD from "./pages/admin/CategoriesCRUD";
import ActivitiesCRUD from "./pages/admin/ActivitiesCRUD";
import PromosCRUD from "./pages/admin/PromosCRUD";
import TransactionsCRUD from "./pages/admin/TransactionsCRUD";
import UserCRUD from "./pages/admin/UserCRUD";

function App() {
  const { user } = useSelector((state) => state.auth || {});

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                {user ? <Transactions /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/:id"
            element={
              <ProtectedRoute>
                {user ? <TransactionDetail /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {user ? <Profile /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                {user ? <EditProfile /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route path="/promos" element={<Promos />} />
          <Route path="/promos/:id" element={<PromoDetail />} />
          <Route path="/categories/:id" element={<Category />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? <Dashboard /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? <BannersCRUD /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? (
                  <CategoriesCRUD />
                ) : (
                  <Navigate to="/" />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/activities"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? (
                  <ActivitiesCRUD />
                ) : (
                  <Navigate to="/" />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/promos"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? <PromosCRUD /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? (
                  <TransactionsCRUD />
                ) : (
                  <Navigate to="/" />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                {user?.role === "admin" ? <UserCRUD /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
