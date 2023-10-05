/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";

import { StyledButton } from "./styles";
import Spinner from "../Spinner";

export default function Button({
  type = "button",
  disabled = false,
  isLoading = false,
  children,
  danger,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.func,
  onClick: PropTypes.func,
};
