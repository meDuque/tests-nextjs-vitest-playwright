/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <Expected iterable callback return> */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTodos } from '@/core/__tests__/mocks/todos';
import type { Todo } from '@/core/todo/schemas/todo.contract';
import { TodoList } from '.';

const user = userEvent.setup();

describe('<TodoList /> (integration)', () => {
  test('deve renderizar heading, lista e itens da lista de TODOs', async () => {
    const { todos } = renderList();

    const heading = screen.getByRole('heading', {
      name: /lista de tarefas/i,
      level: 1,
    });
    const list = screen.getByRole('list', { name: /lista de tarefas/i });
    const items = screen.getAllByRole('listitem');

    expect(heading).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-labelledby', heading.id);

    expect(items).toHaveLength(todos.length);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(todos[index].description);
    });
  });
});

interface RenderListProps {
  delay?: number;
  success?: boolean;
  todos?: Todo[];
}

function renderList({
  delay = 0,
  success = true,
  todos = mockTodos,
}: RenderListProps = {}) {
  const newTodos = [...todos];
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'desc', createdAt: 'createdAt' },
  };
  const actionErrorResult = {
    success: false,
    errors: ['falha ao apagar todo'],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;
  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  const renderResult = render(<TodoList action={action} todos={newTodos} />);

  return { action, renderResult, todos: newTodos };
}
