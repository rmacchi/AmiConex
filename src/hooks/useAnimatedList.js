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

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
}
