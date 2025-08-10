export default function Input({ label, type = "text", value, onChange, placeholder, className = "" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${className}`}
      />
    </div>
  );
}