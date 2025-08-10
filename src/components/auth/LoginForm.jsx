import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function LoginForm({
  form,
  setForm,
  submit,
  error,
  success,
  status,
}) {
  return (
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

      <LoginInput
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <LoginInput
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <LoginButton loading={status === "loading"} />

      <p className="text-sm text-center">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}
