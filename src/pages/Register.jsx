import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import RegisterSuccess from "../components/auth/RegisterSuccess";
import useRegister from "../hooks/useRegister";

export default function RegisterPage() {
  const { form, success, status, error, handleChange, handleSubmit } =
    useRegister();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
      {success && <RegisterSuccess />}
      {!success && (
        <RegisterForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          status={status}
          error={error}
        />
      )}
      <p className="text-sm text-center mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
