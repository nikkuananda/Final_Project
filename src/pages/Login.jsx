import LoginForm from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { form, setForm, submit, status, error, success } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm
        form={form}
        setForm={setForm}
        submit={submit}
        status={status}
        error={error}
        success={success}
      />
    </div>
  );
}
