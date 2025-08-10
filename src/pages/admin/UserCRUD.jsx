import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  createUser,
  updateUserRole,
} from "../../store/slices/userSlice";

export default function UserCrud() {
  const dispatch = useDispatch();
  const { allUsers, allUsersLoading, mutationLoading, error } = useSelector(
    (state) => state.user
  );

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    role: "user",
    password: "",
  });

  // Mengambil data pengguna saat komponen dimuat
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Mengatur perubahan pada input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mengirim data untuk membuat atau memperbarui pengguna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Update role pengguna
        await dispatch(
          updateUserRole({ userId: form.id, role: form.role })
        ).unwrap();
        alert("✅ Role berhasil diupdate!");
      } else {
        // Membuat pengguna baru
        await dispatch(createUser(form)).unwrap();
        alert("✅ User berhasil dibuat!");
      }

      // Reset form setelah berhasil
      setForm({
        id: null,
        name: "",
        email: "",
        phoneNumber: "",
        role: "user",
        password: "",
      });
    } catch (err) {
      alert(`❌ Gagal: ${err.message || "Terjadi kesalahan"}`);
    }
  };

  // Menyiapkan form untuk mengedit pengguna
  const handleEdit = (user) => {
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      password: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* FORM untuk menambah atau memperbarui pengguna */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4 mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {!form.id && (
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 rounded"
              required
            />
          )}
        </div>
        <button
          type="submit"
          disabled={mutationLoading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {form.id ? "Update Role" : "Create User"}
        </button>
      </form>

      {/* Menampilkan daftar pengguna */}
      {allUsersLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 ? (
            allUsers.map((u, index) => (
              <tr key={u.id ?? `user-${index}`}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.phoneNumber}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr key="no-users-row">
              <td colSpan={6} className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
