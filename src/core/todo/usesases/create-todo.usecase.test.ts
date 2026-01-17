import { makeTestTodoRepository } from '@/core/___tests__/utils/make-test-todo-repository';

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  // TODO Tests for createTodoUseCase
  throw new Error('Not implemented yet');
});
