import { io } from 'socket.io-client';
import { API_URL } from '../config';

export const socket = io(API_URL);

export interface ProgressUpdate {
  _id: string;
  progress: number;
}
//eslint-disable-next-line no-unused-vars
export const setupSocketListeners = (onProgressUpdate: (update: ProgressUpdate) => void): (() => void) => {
  socket.on('update-todo-progress', (update: ProgressUpdate) => onProgressUpdate(update));

  return () => {
    socket.off('update-todo-progress', onProgressUpdate);
  };
}; 