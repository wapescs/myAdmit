// Generic contract a feature's repository interface can extend when its
// access pattern is a plain findAll/findById collection. Feature-specific
// repositories (e.g. IUniversityRepository) are defined in their own
// feature folder since they usually need extra methods beyond this shape.
export interface IRepository<T, ID = string> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
}
