export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring ${className}`}
      {...props}
    />
  );
}
export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full border rounded-xl px-3 py-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
export function Label({ className = "", children }) {
  return (
    <label className={`text-sm text-slate-600 ${className}`}>{children}</label>
  );
}
