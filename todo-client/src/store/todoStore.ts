/* eslint-disable no-unused-vars */
import {create} from 'zustand';
import { Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  updateTodoProgress: (todoId: string, progress: number) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (todoId: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  updateTodoProgress: (todoId, progress) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === todoId ? { ...todo, progress } : todo
      ),
    })),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      ),
    })),
  deleteTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== todoId),
    })),
})); 