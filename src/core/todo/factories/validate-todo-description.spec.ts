import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("Deve retornar uma função vazia", () => {
    // Implementar o teste para voltar uma função vazia
    const result = validateTodoDescription("");
    expect(result.success).toBe(false);
    expect(result.error).toContain("A descrição não pode ser vazia.");
  });

  test("Deve retornar uma função com menos de 3 caracteres", () => {
    // Implementar o teste para voltar uma função com menos de 3 caracteres
    const result = validateTodoDescription("ab");
    expect(result.success).toBe(false);
    expect(result.error).toContain("A descrição precisa exceder 3 caracteres.");
  });

  test("Deve retornar uma função não vazia", () => {
    // Implementar o teste para voltar uma função não vazia
    const result = validateTodoDescription("Valid description");
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test("Deve retornar uma função com mais de 3 caracteres", () => {
    // Implementar o teste para voltar uma função com mais de 3 caracteres
    const result = validateTodoDescription("abcd");
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
