import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef("valor inicial");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      } catch {
        navigate("/");
        toast({
          type: "danger",
          text: "Contato não encontrado!",
        });
      }
    }

    loadContact();
  }, [id, navigate]);

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
