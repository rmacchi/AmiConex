import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

// import Loader from "../../components/Loader";
// import Modal from "../../components/Modal";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      });
    try {

    } catch (error) {
      console.log("erro", error);
    }
  }, []);

  return (
    <Container>
      {/* <Loader /> */}
      {/* <Modal danger /> */}
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? " contato" : " contatos"}
        </strong>
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

      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
                <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

// SOP -> Same Origin Policy -> Politica de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://domínio:porta

// Saida: http://localhost:3000
// Destino: http://localhost:3001
