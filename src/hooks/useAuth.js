import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(({ user }) => {
        setSuccess(true);
        setTimeout(() => {
          if (user.role === "admin") navigate("/admin");
          else navigate("/");
        }, 1200);
      })
      .catch(() => setSuccess(false));
  };

  return { form, setForm, submit, status, error, success };
}
