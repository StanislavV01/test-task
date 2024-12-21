export interface Todo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export type CreateTodoInput = Omit<Todo, '_id'>;

export interface UpdateTodoInput extends Partial<CreateTodoInput> {
  _id: string;
} 