import { useCallback, useState } from "react";

export default function useAnimatedList() {
  const [items, setItems] = useState([]);

  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pendingRemovalItemsIds.includes(item.id),
    }))
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  };
}
