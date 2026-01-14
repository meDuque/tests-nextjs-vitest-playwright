import * as sanitizeStrMod from "@/utils/sanitize-str";
import {
  InvalidTodo,
  makeValidatedTodo,
  ValidTodo,
} from "./make-validated-todo";
import * as makeNewTodoMod from "./make-new-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";

describe("makeValidatedTodo (unit)", () => {
  test("deve chamar a função sanitizeStr com o valor corrento", () => {
    // Arrange
    const { description, sanitizeStrSpy } = makeMocks();

    // Act
    makeValidatedTodo(description);

    // Assert
    // Aqui você verificaria se sanitizeStr foi chamado com "  New Todo  "
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
  });

  test("deve chamar a função validateTodoDescription com o retorno de sanitizeStr", () => {
    // Arrange
    const { description, sanitizeStrSpy, validatedTodoDescriptionSpy, todo } =
      makeMocks();
    const sanitizeStrReturn = "retorno da sanitizeStr";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    // Act
    const result = makeValidatedTodo(description);
    console.log(result);
    // Assert
    expect(validatedTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn
    );
    expect(result.success).toBe(true);
    expect(result.data).toStrictEqual({
      id: "any-id",
      description: "  New Todo  ",
      createdAt: expect.any(String),
    });
  });

  // test("deve chamar a função makeNewTodo se validateTodoDescription retornou sucesso", () => {});

  // test("deve retornar validatedDescription.errors se a validação falhou", () => {});
});

const makeMocks = (description = "  New Todo  ") => {
  const errors = ["any", "error"];

  const todo = {
    id: "any-id",
    description,
    createdAt: "any-date",
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validatedTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({
      errors: [],
      success: true,
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
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
