import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(({ token, user }) => {
        console.log("✅ Login berhasil:", { token, user });

        // token & user sudah otomatis disimpan di authSlice
        setSuccess(true);

        // redirect ke home
        setTimeout(() => navigate("/"), 1200);
      })
      .catch((err) => {
        console.error("❌ ERROR LOGIN:", err);
        setSuccess(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        {error && (
          <p className="text-red-500 text-sm">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm">
            ✅ Login berhasil! Mengarahkan...
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
