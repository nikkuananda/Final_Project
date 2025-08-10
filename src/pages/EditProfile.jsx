import EditProfileForm from "../components/profil/EditProfileForm";
import useProfile from "../hooks/useProfile";

export default function EditProfile() {
  const { form, handleChange, handleSubmit, handleCancel, status, error } =
    useProfile();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
      <EditProfileForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        status={status}
        error={error}
        onCancel={handleCancel}
      />
    </div>
  );
}
