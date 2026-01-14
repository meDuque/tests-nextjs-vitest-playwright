type ValidateTodoDescription = {
  success: boolean;
  error?: string[];
};

export function validateTodoDescription(
  description: string
): ValidateTodoDescription {
  const errors = [];

  if (!description || description.trim().length === 0) {
    errors.push("A descrição não pode ser vazia.");
  }

  if (description.length <= 3) {
    errors.push("A descrição precisa exceder 3 caracteres.");
  }

  return {
    success: errors.length === 0,
    error: errors.length > 0 ? errors : undefined,
  };
}
