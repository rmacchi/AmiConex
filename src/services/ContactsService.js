import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listContacts(orderBy = "asc") {
    return this.httpClient.get(`/contacts/22e7f2f3-8d3f-4ebf-be2f-561b4893d25f?orderBy=${orderBy}`);
  }

  async createContacts(contact) {
    return this.httpClient.post("/contacts", contact);
  }
}

export default new ContactsService();
