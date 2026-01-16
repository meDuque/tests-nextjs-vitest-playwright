import { DrizzleTodoRepository } from '@/core/todo/repositories/drizzle-todo.repository';
import { drizzleDatabase } from '@/db';
import { eq } from 'drizzle-orm';

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);
  const todos = makeTestTodos();

  const insertTodoDb = () => db.insert(todoTable);
  const deleteTodoNoWhere = () => db.delete(todoTable);
  const deleteTodoDb = (id: string) =>
    db.delete(todoTable).where(eq(todoTable.id, id));

  return {
    todos,
    repository,
    insertTodoDb,
    deleteTodoNoWhere,
    deleteTodoDb,
  };
}
