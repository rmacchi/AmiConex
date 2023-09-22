import PropTypes from "prop-types";

import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import CheckCircleIcon from "../../../assets/images/icons/check-circle.svg";

export default function ToastMessage({ text, type }) {
  return (
    <Container>
      {type === "danger" && <img src={xCircleIcon} alt="x" />}
      {type === "success" && <img src={CheckCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "success", "danger"]),
};

ToastMessage.defaultProps = {
  type: "default",
};
