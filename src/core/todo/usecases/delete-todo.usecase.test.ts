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
});
