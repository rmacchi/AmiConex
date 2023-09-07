import { Link } from "react-router-dom";

import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import Loader from "../../components/Loader";

// import Modal from "../../components/Modal";

export default function Home() {
  return (
    <Container>
      <Loader />
      {/* <Modal danger /> */}
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>1 contato</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Rafael Macchi</strong>
            <small>instagram</small>
          </div>
          <span>rmacchi@devacademy.com.br</span>
          <span>(19) 99999-99999</span>
        </div>

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="Edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
