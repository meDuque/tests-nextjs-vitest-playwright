import * as sanitizeStrMod from '@/utils/sanitize-str';
import type { InvalidTodo, ValidTodo } from '../schemas/todo-contract';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import * as makeNewTodoMod from './make-new-todo';
import { makeValidatedTodo } from './make-validated-todo';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor corrento', () => {
    // Arrange
    const { description, sanitizeStrSpy } = makeMocks();

    // Act
    makeValidatedTodo(description);

    // Assert
    // Aqui você verificaria se sanitizeStr foi chamado com "  New Todo  "
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
  });

  test('deve chamar a função validateTodoDescription com o retorno de sanitizeStr', () => {
    // Arrange
    const { description, sanitizeStrSpy, validatedTodoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturn = 'retorno da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    // Act
    makeValidatedTodo(description) as ValidTodo;
    // Assert
    expect(validatedTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
  });

  test('deve chamar a função makeNewTodo se validateTodoDescription retornou sucesso', () => {
    // Arrange
    const { description } = makeMocks();
    // Act
    const result = makeValidatedTodo(description) as ValidTodo;
    // Assert
    expect(result.success).toBe(true);
    expect(result.todo.id).toBe('any-id');
    expect(result.todo.description).toBe('  New Todo  ');
    expect(result.todo.createdAt).toMatch(
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
    );
  });

  test('deve retornar validatedDescription.errors se a validação falhou', () => {
    // Arrange
    const { description, errors, validatedTodoDescriptionSpy } = makeMocks();
    validatedTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors,
    });
    // Act
    const result = makeValidatedTodo(description) as InvalidTodo;
    // Assert
    expect(result.success).toBe(false);
    expect(result.errors).toBe(errors);
  });
});

const makeMocks = (description = '  New Todo  ') => {
  const errors = ['any', 'error'];

  const todo = {
    id: 'any-id',
    description,
    createdAt: new Date().toISOString(),
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  const validatedTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      success: true,
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validatedTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
