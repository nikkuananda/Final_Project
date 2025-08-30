import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import BannersCRUD from "./pages/admin/BannersCRUD";
import CategoriesCRUD from "./pages/admin/CategoriesCRUD";
import ActivitiesCRUD from "./pages/admin/ActivitiesCRUD";
import PromosCRUD from "./pages/admin/PromosCRUD";
import TransactionsCRUD from "./pages/admin/TransactionsCRUD"; // ⬅️ tambahkan ini

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/banners" element={<BannersCRUD />} />
          <Route path="/admin/categories" element={<CategoriesCRUD />} />
          <Route path="/admin/activities" element={<ActivitiesCRUD />} />
          <Route path="/admin/promos" element={<PromosCRUD />} />
          <Route
            path="/admin/transactions"
            element={<TransactionsCRUD />}
          />{" "}
          {/* ⬅️ route ini */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
