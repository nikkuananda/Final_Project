import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function useProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!user && status === "idle") dispatch(fetchProfile());
  }, [dispatch, user, status]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return { user, status, error, handleLogout };
}
