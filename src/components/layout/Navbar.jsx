import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Compass,
  Receipt,
  LayoutDashboard,
  Tags,
  Image,
  FileText,
  Users,
  LogIn,
  User,
} from "lucide-react";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);
  const transactions = useSelector((state) => state.transactions.transactions);
  const users = useSelector((state) => state.user.allUsers);

  const cartCount = items?.length || 0;
  const trxCount = transactions?.length || 0;
  const userCount = users?.length || 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/"); // logout balik ke home
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 hover:text-sky-600 transition-colors ${
      isActive ? "text-sky-600 font-semibold" : "text-slate-700"
    }`;

  const withBadge = (Icon, count) => (
    <div className="relative flex items-center">
      <Icon size={18} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <Link to="/" className="font-extrabold text-sky-600 text-xl">
          Travel<span className="text-slate-700">.Lezia</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-slate-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav menu */}
        <nav
          className={`${
            open ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow lg:shadow-none p-4 lg:p-0`}
        >
          {/* Guest menu */}
          {!user && (
            <>
              <NavLink to="/" className={navLinkClass}>
                <Home size={18} /> Home
              </NavLink>
              <NavLink to="/login" className={navLinkClass}>
                <LogIn size={18} /> Login
              </NavLink>
            </>
          )}

          {/* User menu */}
          {user && user.role !== "admin" && (
            <>
              <NavLink to="/" className={navLinkClass}>
                <Home size={18} /> Home
              </NavLink>
              <NavLink to="/activities" className={navLinkClass}>
                <Compass size={18} /> Activities
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                {withBadge(ShoppingCart, cartCount)}
                <span className="ml-1">Cart</span>
              </NavLink>
              <NavLink to="/transactions" className={navLinkClass}>
                {withBadge(Receipt, trxCount)}
                <span className="ml-1">Transactions</span>
              </NavLink>
            </>
          )}

          {/* Admin menu */}
          {user?.role === "admin" && (
            <div className="lg:ml-4 flex flex-col lg:flex-row gap-3">
              <NavLink to="/admin" className={navLinkClass}>
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
              <NavLink to="/admin/categories" className={navLinkClass}>
                <Tags size={18} /> Categories
              </NavLink>
              <NavLink to="/admin/activities" className={navLinkClass}>
                <Compass size={18} /> Activities
              </NavLink>
              <NavLink to="/admin/promos" className={navLinkClass}>
                <FileText size={18} /> Promos
              </NavLink>
              <NavLink to="/admin/banners" className={navLinkClass}>
                <Image size={18} /> Banners
              </NavLink>
              <NavLink to="/admin/transactions" className={navLinkClass}>
                {withBadge(Receipt, trxCount)}
                <span className="ml-1">Transactions</span>
              </NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>
                {withBadge(Users, userCount)}
                <span className="ml-1">Users</span>
              </NavLink>
            </div>
          )}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg border border-sky-600 text-sky-600 hover:bg-sky-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-600 text-sky-600 hover:bg-sky-50 transition"
              >
                {user?.profilePicture || user?.profile_image_url ? (
                  <img
                    src={user.profilePicture || user.profile_image_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40?text=U";
                    }}
                  />
                ) : (
                  <User size={20} />
                )}
                <span className="hidden md:inline">Profile</span>
              </button>

              <button
                onClick={doLogout}
                className="px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
