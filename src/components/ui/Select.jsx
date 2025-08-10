export default function Select({ label, options = [], value, onChange, className = "" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${className}`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}