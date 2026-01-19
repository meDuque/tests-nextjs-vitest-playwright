import { revalidatePath } from 'next/cache';
import type { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import * as deleteTodoUseCaseMod from '../usecases/delete-todo.usecase';
import { deleteTodoAction } from './delete-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  test('deve chamar o deleteTodoUseCase com os valores corretos', async () => {
    const { deleteTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = 'usecase should be called with this description';
    await deleteTodoAction(expectedParamCall);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeMocks();
    const description = 'usecase should be called with this description';
    await deleteTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });
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

  const deleteTodoUseCaseSpy = vi
    .spyOn(deleteTodoUseCaseMod, 'deleteTodoUseCase')
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    deleteTodoUseCaseSpy,
    revalidatePathMocked,
  };
};
