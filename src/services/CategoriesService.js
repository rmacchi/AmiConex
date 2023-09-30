import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get("/categories", { signal });

    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoriesById(id) {
    const category = await this.httpClient.get(`/categories/${id}`);

    return CategoryMapper.toDomain(category);
  }

  createCategories(category) {
    const mapperCategory = CategoryMapper.toPersistance(category);

    return this.httpClient.post("/categories", { mapperCategory });
  }

  updateCategory(id, category) {
    const mapperCategory = CategoryMapper.toPersistance(category);

    return this.httpClient.put(`/categories/${id}`, { mapperCategory });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
