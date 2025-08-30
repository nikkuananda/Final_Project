import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    profilePictureUrl: "",
    phoneNumber: "",
    role: "user", // default user
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.passwordRepeat) {
      alert("Password dan Repeat Password harus sama.");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      passwordRepeat: form.passwordRepeat,
      phoneNumber: form.phoneNumber,
      role: form.role,
      profilePictureUrl:
        form.profilePictureUrl.trim() ||
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    };

    dispatch(register(payload))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
      )}

      {success && (
        <p className="text-green-600 text-sm mb-3">
          🎉 Berhasil Register! Mengarahkan ke login...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="passwordRepeat"
          placeholder="Repeat Password"
          type="password"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="profilePictureUrl"
          placeholder="Profile Picture URL (optional)"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* Dropdown untuk role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:opacity-50"
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
