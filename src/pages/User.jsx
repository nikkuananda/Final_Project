import { useSelector } from "react-redux";

export default function User() {
  const { user } = useSelector((s) => s.auth);

  if (!user)
    return (
      <p className="text-center mt-10">Please login to see your profile.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <img
          src={user.profilePictureUrl}
          alt={user.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
