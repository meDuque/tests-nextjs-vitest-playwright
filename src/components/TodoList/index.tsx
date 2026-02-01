import type { ReactNode } from 'react';

interface TodoListProps {
  children: ReactNode;
}

export function TodoList({ children }: TodoListProps) {
  return (
    <>
      <h1>TodoList</h1>
      {children}
    </>
  );
}
