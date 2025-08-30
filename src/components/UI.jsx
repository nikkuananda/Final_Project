// src/components/ui/UI.jsx

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

export function Button({ children, onClick, className = "", variant }) {
  let baseClass = "px-4 py-2 rounded text-white ";
  if (variant === "danger") baseClass += "bg-red-600 hover:bg-red-700";
  else baseClass += "bg-blue-600 hover:bg-blue-700";

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}
