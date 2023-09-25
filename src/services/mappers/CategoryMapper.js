class CategoryMapper {
  toDomain(persistanceCategory) {
    return {
      id: persistanceCategory.id,
      name: persistanceCategory.name,
    };
  }

  toPersistance(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }
}

export default new CategoryMapper();
