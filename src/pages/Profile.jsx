import ProfileInfo from "../components/profil/ProfileInfo";
import ProfileActions from "../components/profil/ProfileActions";
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const { user, status, error, handleLogout } = useProfile();

  if (status === "loading")
    return <p className="text-center mt-6">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-center mt-6 text-red-500">
        {error || "Gagal memuat data profil"}
      </p>
    );

  if (!user)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Belum login</h2>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login dulu
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <ProfileInfo user={user} />
      <ProfileActions onLogout={handleLogout} />
    </div>
  );
}
