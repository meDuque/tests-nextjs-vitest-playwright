import { makeTestTodoRepository } from '@/core/___tests__/utils/make-test-todo-repository';
import { deleteTodoUsecase } from './delete-todo.usecase';

describe('deleteTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('deve retornar erro se o ID for inválido', async () => {
    const result = await deleteTodoUsecase('');

    expect(result).toStrictEqual({
      success: false,
      errors: ['Invalid ID provided.'],
    });
  });

  test('deve retornar sucesso se o TODO existe na base de dados', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUsecase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });
});
