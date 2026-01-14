type ValidateTodoDescription = {
  success: boolean;
  errors?: string[];
};

export function validateTodoDescription(
  description: string
): ValidateTodoDescription {
  const errors = [];

  if (!description || description.length === 0) {
    errors.push("A descrição não pode ser vazia.");
  }

  if (description.length <= 3) {
    errors.push("A descrição precisa exceder 3 caracteres.");
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
