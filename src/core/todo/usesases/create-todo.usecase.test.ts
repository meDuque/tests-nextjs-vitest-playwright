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

  test('deve retornar um erro se o repositorio falhar', async () => {
    // Cria um TODO válido primeiro
    const description = 'Comprar leite';
    (await createTodoUseCase(description)) as ValidTodo;
    // Tenta criar o mesmo TODO novamente para causar um erro de duplicação
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0]).toBe(
      'Todo with the same ID or description already exists.',
    );
  });
});
