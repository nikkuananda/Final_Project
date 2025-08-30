import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Payment from "./pages/Payment";
import Category from "./pages/Category";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import BannersCRUD from "./pages/admin/BannersCRUD";
import CategoriesCRUD from "./pages/admin/CategoriesCRUD";
import ActivitiesCRUD from "./pages/admin/ActivitiesCRUD";
import PromosCRUD from "./pages/admin/PromosCRUD";
import TransactionsCRUD from "./pages/admin/TransactionsCRUD";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activity/:id" element={<ActivityDetail />} />
      <Route path="/categories/:id" element={<Category />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/banners"
        element={
          <ProtectedRoute role="admin">
            <BannersCRUD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute role="admin">
            <CategoriesCRUD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/activities"
        element={
          <ProtectedRoute role="admin">
            <ActivitiesCRUD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/promos"
        element={
          <ProtectedRoute role="admin">
            <PromosCRUD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute role="admin">
            <TransactionsCRUD />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
