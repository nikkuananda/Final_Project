export default function Card({ children, className = "" }) {
  return (
    <div className={`p-4 rounded-xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
}