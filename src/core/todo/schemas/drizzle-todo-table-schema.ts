// Drizzle Todo Table Schema for sqlite database
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todo', {});

export type TodoTableSelectModel = InferSelectModel<typeof todoTable>;
export type TodoTableInsertModel = InferInsertModel<typeof todoTable>;
