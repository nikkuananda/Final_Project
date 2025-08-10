export default function CartItem({
  item,
  checked,
  onToggle,
  onDelete,
  deleting,
}) {
  return (
    <li className="flex justify-between items-center p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <div>
          <p className="font-semibold">{item?.activity?.title}</p>
          <p className="text-gray-600">
            Rp {item?.activity?.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        disabled={deleting === item.id}
      >
        {deleting === item.id ? "Removing..." : "Remove"}
      </button>
    </li>
  );
}
