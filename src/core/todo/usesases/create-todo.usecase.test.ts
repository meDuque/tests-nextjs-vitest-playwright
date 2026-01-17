import type { InvalidTodo, ValidTodo } from '../schemas/todo-contract';
import { createTodoUseCase } from './create-todo.usecase';
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
  test('deve retornar erro se a validação falhar', async () => {
    const result = (await createTodoUseCase('')) as InvalidTodo; // descrição inválida

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(2); // Espera 2 erros de validação
  });

  test('deve retornar o TODO se a validação passar', async () => {
    const description = 'Comprar leite';
    const result = (await createTodoUseCase(description)) as ValidTodo; // descrição válida

    expect(result.success).toBe(true);
    expect(result.todo).toBeDefined();
    expect(result.todo.description).toBe(description);
  });
});
