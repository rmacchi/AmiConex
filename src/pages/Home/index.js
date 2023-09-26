/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from "./styles";

import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

import useHome from "./useHome";

import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import ErrorStatus from "./components/ErrorStatus";
import EmptyList from "./components/EmptyList";
import SearchNotFound from "./components/SearchNotFound";
import ContactsList from "./components/ContactsList";

export default function Home() {
  const {
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleTryAgain,
    hasError,
    isLoading,
    orderBy,
    handleToggleOrderBy,
    contacts,
    searchTerm,
    filteredContacts,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}

      {!hasError && (
        <>
            {(contacts.length < 1 && !isLoading) && (<EmptyList />)}

            {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFound onSearchTerm={searchTerm} />
            )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p> Esta ação não poderá ser desfeita! </p>
          </Modal>
        </>
      )}
    </Container>
  );
}

// SOP -> Same Origin Policy -> Politica de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://domínio:porta

// Saida: http://localhost:3000
// Destino: http://localhost:3001
