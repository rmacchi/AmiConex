import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listContacts(orderBy = "asc") {
    return this.httpClient.get(`/contactss?orderBy=${orderBy}`);
  }

  async createContacts(contact) {
    return this.httpClient.post("/contacts", contact);
  }
}

export default new ContactsService();
