import { makeTestTodoMocks } from '@/core/___tests__/utils/make-test-todo-mocks';
import { deleteTodoAction } from './delete-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  test('deve chamar o deleteTodoUseCase com os valores corretos', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'usecase should be called with this description';
    await deleteTodoAction(expectedParamCall);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'usecase should be called with this description';
    await deleteTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('deve retornar o mesmo resultado do deleteTodoUseCase em caso de sucesso', async () => {
    const { successResult } = makeTestTodoMocks();
    const expectedParamCall = 'usecase should be called with this description';
    const result = await deleteTodoAction(expectedParamCall);

    expect(result).toStrictEqual(successResult);
  });
});
