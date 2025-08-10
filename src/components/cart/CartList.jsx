import CartItem from "./CartItem";

export default function CartList({
  items,
  selectedItems,
  toggleSelectItem,
  onDelete,
  deleting,
}) {
  return (
    <ul className="space-y-4 mb-6">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          checked={selectedItems.includes(item.id)}
          onToggle={() => toggleSelectItem(item.id)}
          onDelete={() => onDelete(item.id)}
          deleting={deleting}
        />
      ))}
    </ul>
  );
}
