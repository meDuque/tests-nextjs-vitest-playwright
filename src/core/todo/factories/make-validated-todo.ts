import { sanitizeStr } from "@/utils/sanitize-str";
import { makeNewTodo } from "./make-new-todo";
import { validateTodoDescription } from "../schemas/validate-todo-description";

export function makeValidatedTodo(description: string) {
  const cleanedDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanedDescription);

  if (validatedDescription.success) {
    return { success: true, data: makeNewTodo(cleanedDescription) };
  }

  return { success: false, error: validatedDescription.errors };
}
