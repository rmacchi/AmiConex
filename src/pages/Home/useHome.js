import {
  useEffect, useState, useCallback, useMemo, useDeferredValue,
} from "react";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderName] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderName(
      (prevState) => (prevState === "asc" ? "desc" : "asc"),
    );
  }, []);

  const handleChangeSearchTerm = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleTryAgain = useCallback(() => {
    loadContacts();
  }, [loadContacts]);

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: "success",
        text: "Contato deletado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato!",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
