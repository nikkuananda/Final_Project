// src/components/profil/ProfileInfo.jsx
export default function ProfileInfo({ user }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={user.profilePictureUrl || "https://i.pravatar.cc/150"}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 border"
      />
      <h2 className="text-xl font-bold">
        {user.name || "Nama tidak tersedia"}
      </h2>
      <p className="text-gray-500">{user.email}</p>
      {user.phoneNumber && <p className="text-gray-500">{user.phoneNumber}</p>}
    </div>
  );
}
