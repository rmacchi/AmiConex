import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import useNewContact from "./useNewContact";

export default function NewContact() {
  const {
    handleSubmit,
    contactFormRef,
  } = useNewContact();

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
