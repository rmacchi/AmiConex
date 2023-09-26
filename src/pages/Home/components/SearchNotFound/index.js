/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from "prop-types";

import { Container } from "./styles";
import magnifierQuestion from "../../../../assets/images/magnifier-question .svg";

export default function SearchNotFound({ onSearchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />

      <span>
        Nenhum resultado foi encontrado para <strong>{onSearchTerm}</strong>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  onSearchTerm: PropTypes.func.isRequired,
};
