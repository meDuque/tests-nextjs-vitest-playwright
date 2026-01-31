'use client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '.';

const user = userEvent.setup();
describe('<TodoForm /> (integration)', () => {
  test('deve renderizar todos os componentes do form', async () => {
    const { input, btn } = renderForm();

    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('deve chamar a action com os valores corretos', async () => {
    const { action, input, btn } = renderForm();
    await user.type(input, 'tarefa');
    await user.click(btn);

    expect(action).toHaveBeenCalledExactlyOnceWith('tarefa');
  });

  test('deve cortar espaços do inicio e fim da descrição (trim)', async () => {
    const { action, input, btn } = renderForm();
    await user.type(input, '    tarefa    ');
    await user.click(btn);

    expect(action).toHaveBeenCalledExactlyOnceWith('tarefa');
  });

  test('deve limpar o input se o formulario retornar sucesso', async () => {
    const { input, btn } = renderForm();
    await user.type(input, 'tarefa');
    await user.click(btn);

    expect(input).toHaveValue('');
  });

  test('deve desativar o botão enquanto envia a action', async () => {
    const { input, btn } = renderForm({ delay: 15 });
    await user.type(input, 'tarefa');
    await user.click(btn);

    await waitFor(() => expect(btn).toBeDisabled());
    await waitFor(() => expect(btn).toBeEnabled());
  });

  test('deve desativar o input enquanto envia a action', async () => {
    const { input, btn } = renderForm({ delay: 15 });
    await user.type(input, 'tarefa');
    await user.click(btn);

    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  // test('deve trocar o texto do botão enquanto envia a action', async () => {});

  // test('deve mostrar o erro quando a action retornar erro', async () => {});

  // test('deve manter o texto no input se a action retornar erro', async () => {});
});

interface RenderForm {
  delay?: number;
  success?: boolean;
}

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'description', createAt: 'createdAt' },
  };
  const actionErrorResult = {
    success: false,
    errors: ['falha ao criar todo'],
  };

  const actionResult = success ? actionSuccessResult : actionErrorResult;
  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText('Tarefa');
  const btn = screen.getByRole('button');

  return { action, input, btn };
}
