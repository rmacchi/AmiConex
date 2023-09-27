import {
  useCallback, useRef, useState, createRef, useEffect,
} from "react";

export default function useAnimatedList() {
  const [items, setItems] = useState([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);

      if (animatedRef?.current) {
        animatedRef.current.addEventListener("animationend", () => {
          handleAnimationEnd(itemId);
        });
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
