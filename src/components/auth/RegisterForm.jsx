// src/components/auth/RegisterForm.jsx
import React from "react";

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
  status,
  error,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-red-500 text-sm mb-3">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
      )}

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
  );
}
