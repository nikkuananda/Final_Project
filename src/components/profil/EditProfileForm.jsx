import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePictureUrl: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form disubmit:", form);
    // di sini taruh API update
  };

  return (
    <EditProfileForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      status="idle"
      error=""
      onCancel={() => console.log("Batal")}
    />
  );
}
