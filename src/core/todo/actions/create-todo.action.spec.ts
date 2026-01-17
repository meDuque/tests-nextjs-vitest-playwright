import type { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import * as createTodoUseCaseMod from '../usecases/create-todo.usecase';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('deve chamar o createTodoUseCase com os valores corretos', async () => {});

  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {});

  test('deve retornar o mesmo resultado do createTodoUseCase em caso de sucesso', async () => {});

  test('deve retornar o mesmo resultado do createTodoUseCase em caso de erro', async () => {});
});

const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: 'any-id',
      description: 'any-description',
      createdAt: 'any-date',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any', 'error'],
  } as InvalidTodo;

  const createTodoUseCase = vi
    .spyOn(createTodoUseCaseMod, 'createTodoUseCase')
    .mockResolvedValue(successResult);

  return { successResult, errorResult, createTodoUseCase };
};
