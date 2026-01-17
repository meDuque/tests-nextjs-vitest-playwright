import { DrizzleTodoRepository } from './drizzle-todo.repository';
import { drizzleDatabase } from '@/db';
import type { TodoRepository } from './todo.contract.repository';

export const todoRepository: TodoRepository = new DrizzleTodoRepository(
  drizzleDatabase.db,
);
