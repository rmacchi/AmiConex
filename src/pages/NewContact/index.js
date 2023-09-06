import PageHeader from "../../components/PageHeader";

import Input from "../../components/Input";
import Select from "../../components/Select";

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />

      <Input type="text" placeholder="Nome" />
      <Select>
        <option value="123">Instagram</option>
        <option value="123">Facebook</option>
        <option value="123">Twitter / X</option>
        <option value="123">LinkedIn</option>
      </Select>
    </>
  );
}
