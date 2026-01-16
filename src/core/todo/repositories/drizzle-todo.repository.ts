import type { DrizzleDatabase } from '@/db';
import type { Todo, TodoPresenter } from '../schemas/todo-contract';
import type { TodoRepository } from './todo.contract.repository';

export class DrizzleTodoRepository implements TodoRepository {
  private readonly db: DrizzleDatabase;

  constructor(db: DrizzleDatabase) {
    this.db = db;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.db.query.todo.findMany({
      orderBy: (todo, { desc }) => [
        desc(todo.createdAt),
        desc(todo.description),
      ],
    });

    return todos;
  }

  create(todo: Todo): Promise<TodoPresenter> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<TodoPresenter> {
    throw new Error('Method not implemented.');
  }
}
