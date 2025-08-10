import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../store/slices/authSlice";
import { useEffect } from "react";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) dispatch(getMe());
  }, [dispatch]);

  const doLogout = async () => {
    await dispatch(logout());
    nav("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="font-extrabold text-sky-600 text-xl">
          Travel.
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-5 text-slate-700">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-sky-600" : "")}
          >
            Home
          </NavLink>

          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-sky-600" : "")}
            >
              Authentication
            </NavLink>
          )}

          {user && (
            <>
              <NavLink
                to="/user"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                User
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Category
              </NavLink>
              <NavLink
                to="/activities"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Activity
              </NavLink>
              <NavLink
                to="/promos"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Promo
              </NavLink>
              <NavLink
                to="/banners"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Banner
              </NavLink>
              <NavLink
                to="/payments"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Payment Method
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Cart
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              >
                Transaction
              </NavLink>
              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "text-sky-600" : "")}
                >
                  Admin
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Authentication Buttons */}
        <div className="flex gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={doLogout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
