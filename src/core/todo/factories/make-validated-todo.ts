import { sanitizeStr } from "@/utils/sanitize-str";
import { makeNewTodo } from "./make-new-todo";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import type { Todo } from "../schemas/todo-contract";

type InvalidTodo = {
  success: false;
  errors?: string[];
};

type ValidTodo = {
  success: true;
  data: Todo;
};
export type MakeValidatedTodo = ValidTodo | InvalidTodo;

export function makeValidatedTodo(description: string): MakeValidatedTodo {
  const cleanedDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanedDescription);

  if (validatedDescription.success) {
    return { success: true, data: makeNewTodo(cleanedDescription) };
  }

  return { success: false, errors: validatedDescription.errors };
}
