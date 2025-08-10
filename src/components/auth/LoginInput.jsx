export default function LoginInput({
  type,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border px-3 py-2 rounded"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
