'use client';
import { CirclePlusIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import type { CreateTodoAction } from '@/core/todo/actions/todo.action.types';
import { sanitizeStr } from '@/utils/sanitize-str';
import { Button } from '../Button';
import { InputText } from '../InputText';

export type TodoFormProps = {
  action: CreateTodoAction;
};

export function TodoForm({ action }: TodoFormProps) {
  return (
    <form onSubmit={'handleCreateTodo'} className='flex flex-col flex-1 gap-6'>
      <InputText
        name='description'
        labelText='Tarefa'
        placeholder='Digite sua tarefa'
        disabled={'pending'}
        errorMessage={'inputError'}
        ref={'ref'}
      />

      <Button type='submit' disabled={'pending'}>
        <CirclePlusIcon />
        {!'pending' && <span>Criar tarefa</span>}
        {'pending' && <span>Criando tarefa...</span>}
      </Button>
    </form>
  );
}
