import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    profilePictureUrl: "",
    phoneNumber: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      {error && (
        <p className="text-red-500 text-sm mb-3">
          {JSON.stringify(error.errors || error.message)}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="passwordRepeat"
          placeholder="Repeat Password"
          type="password"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="profilePictureUrl"
          placeholder="Profile Picture URL"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
