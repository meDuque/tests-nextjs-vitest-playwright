import type { Todo, TodoPresenter } from '../schemas/todo-contract';
import type { TodoRepository } from './todo.contract.repository';

export class DrizzleTodoRepository implements TodoRepository {
  findAll(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }
  create(todo: Todo): Promise<TodoPresenter> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<TodoPresenter> {
    throw new Error('Method not implemented.');
  }
}
