// src/components/profile/ProfilePicturePreview.jsx
export default function ProfilePicturePreview({ url }) {
  if (!url) return null;
  return (
    <img
      src={url}
      alt="Preview"
      className="w-20 h-20 rounded-full mt-2 border"
    />
  );
}
