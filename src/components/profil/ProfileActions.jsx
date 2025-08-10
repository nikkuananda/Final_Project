// src/components/profil/ProfileActions.jsx
import { Link } from "react-router-dom";

export default function ProfileActions({ onLogout }) {
  return (
    <div className="mt-6 flex justify-between">
      <Link
        to="/profile/edit"
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
      >
        Edit Profile
      </Link>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
