import { DrizzleTodoRepository } from '@/core/todo/repositories/drizzle-todo.repository';
import { drizzleDatabase } from '@/db';

export async function makeTestTodoRepository() {
  const repository = new DrizzleTodoRepository(drizzleDatabase.db);

  return {
    repository,
  };
}
