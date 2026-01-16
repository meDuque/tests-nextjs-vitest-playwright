export interface FindAllTodosRepository {
  findAll(): Promise<any[]>;
}
