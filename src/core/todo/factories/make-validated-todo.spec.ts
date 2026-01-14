import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedTodo } from "./make-validated-todo";

describe("makeValidatedTodo (unit)", () => {
  test("deve chamar a função sanitizeStr com o valor corrento", () => {
    // Arrange
    const description = "  New Todo  ";
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockResolvedValue(description);

    // Act
    makeValidatedTodo(description);

    // Assert
    // Aqui você verificaria se sanitizeStr foi chamado com "  New Todo  "
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
  });

  // test("deve chamar a função validateTodoDescription com o retorno de sanitizeStr", () => {});

  // test("deve chamar a função makeNewTodo se validateTodoDescription retornou sucesso", () => {});

  // test("deve retornar validatedDescription.errors se a validação falhou", () => {});
});
