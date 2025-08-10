import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";

export default function useRegister() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    profilePictureUrl: "",
    phoneNumber: "",
    role: "user",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.passwordRepeat) {
      alert("Password dan Repeat Password harus sama.");
      return;
    }

    const payload = {
      ...form,
      profilePictureUrl:
        form.profilePictureUrl.trim() ||
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    };

    dispatch(register(payload))
      .unwrap()
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false));
  };

  return { form, success, status, error, handleChange, handleSubmit };
}
