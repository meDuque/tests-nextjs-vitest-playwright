import { makeTestTodoMocks } from '@/core/___tests__/utils/make-test-todo-mocks';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('deve chamar o createTodoUseCase com os valores corretos', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'usecase should be called with this description';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'usecase should be called with this description';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('deve retornar o mesmo resultado do createTodoUseCase em caso de sucesso', async () => {
    const { successResult } = makeTestTodoMocks();
    const expectedParamCall = 'usecase should be called with this description';
    const result = await createTodoAction(expectedParamCall);

    expect(result).toStrictEqual(successResult);
  });

  test('deve retornar o mesmo resultado do createTodoUseCase em caso de erro', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    createTodoUseCaseSpy.mockResolvedValue(errorResult);
    const expectedParamCall = 'usecase should be called with this description';
    const result = await createTodoAction(expectedParamCall);

    expect(result).toStrictEqual(errorResult);
  });
});
