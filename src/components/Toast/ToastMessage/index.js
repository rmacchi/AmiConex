import PropTypes from "prop-types";

import { useEffect, useRef } from "react";
import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import CheckCircleIcon from "../../../assets/images/icons/check-circle.svg";

export default function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  onAnimationEnd,
}) {
  const animatedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = animatedElementRef.current;
    if (isLeaving) {
      elementRef.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      elementRef.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [isLeaving, message.id, onAnimationEnd]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {message.type === "danger" && <img src={xCircleIcon} alt="x" />}
      {message.type === "success" && <img src={CheckCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["default", "success", "danger"]),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};
