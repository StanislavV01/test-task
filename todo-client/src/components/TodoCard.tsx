import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/todo';

interface TodoCardProps {
  todo: Todo;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onEdit: (id: string, updates: { name: string; description: string }) => void;
}

export function TodoCard({ todo, onDelete, onEdit }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(todo._id, { name, description });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg border bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Task name"
              required
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Task description"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="group relative p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{todo.name}</h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">
            {todo.description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            Edit
          </button>
          <Link
            to={`/todo/${todo._id}`}
            className="text-blue-500 hover:text-blue-600"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(todo._id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${todo.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 min-w-[45px]">
            {todo.progress}%
          </span>
        </div>
      </div>
    </div>
  );
} 