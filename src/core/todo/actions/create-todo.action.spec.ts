import { revalidatePath } from 'next/cache';
import type { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import * as createTodoUseCaseMod from '../usecases/create-todo.usecase';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('deve chamar o createTodoUseCase com os valores corretos', async () => {
    const { createTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = 'usecase should be called with this description';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

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

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, 'createTodoUseCase')
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    revalidatePathMocked,
  };
};
