import axios from 'axios';
import { CreateTodoInput, Todo } from '../types/todo';
import { API_BASE_URL } from '../config';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      //eslint-disable-next-line 
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const response = await api.post('/todos', {
      _id: uuidv4(),
      name: todo.name,
      description: todo.description,
      progress: todo.progress
    });
    return response.data;
  },

  updateTodo: async ({ id, updates }: { id: string; updates: Partial<Todo> }): Promise<Todo> => {
    try {
      const response = await api.put('/todos', {
        _id: id,
        ...updates
      });
      return response.data;
    } catch (error) {
      //eslint-disable-next-line  
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  getTodo: async (id: string): Promise<Todo> => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },
}; 