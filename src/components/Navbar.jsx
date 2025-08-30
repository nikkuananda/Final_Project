import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ikon hamburger

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = async () => {
    try {
      // panggil thunk logout
      await dispatch(logout()).unwrap();

      // redirect ke login
      navigate("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `hover:text-sky-600 transition-colors ${
      isActive ? "text-sky-600 font-semibold" : "text-slate-700"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-sky-600 text-xl">
          Travel<span className="text-slate-700">.App</span>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className="lg:hidden text-slate-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            open ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow lg:shadow-none p-4 lg:p-0`}
        >
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user && user.role !== "admin" && (
            <>
              <NavLink to="/activities" className={navLinkClass}>
                Activities
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                Cart
              </NavLink>
              <NavLink to="/transactions" className={navLinkClass}>
                Transactions
              </NavLink>
            </>
          )}

          {/* Admin menu */}
          {user?.role === "admin" && (
            <div className="lg:ml-4 flex flex-col lg:flex-row gap-3">
              <NavLink to="/admin" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/categories" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="/admin/activities" className={navLinkClass}>
                Activities
              </NavLink>
              <NavLink to="/admin/promos" className={navLinkClass}>
                Promos
              </NavLink>
              <NavLink to="/admin/banners" className={navLinkClass}>
                Banners
              </NavLink>
              <NavLink to="/admin/transactions" className={navLinkClass}>
                Transactions
              </NavLink>
            </div>
          )}

          {/* Auth menu (mobile only) */}
          {!user && (
            <NavLink to="/login" className={navLinkClass}>
              Authentication
            </NavLink>
          )}
        </nav>

        {/* Right side: buttons */}
        <div className="hidden lg:flex gap-2">
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
            <button
              onClick={doLogout}
              className="px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
