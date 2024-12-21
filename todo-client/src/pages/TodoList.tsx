import React, { FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';
import { useTodoStore } from '../store/todoStore';
import { Todo, CreateTodoInput } from '../types/todo';
import { TodoCard } from '../components/TodoCard';
import { setupSocketListeners } from '../api/socket';

export function TodoList(): JSX.Element {
	const queryClient = useQueryClient();
	const { todos, setTodos, addTodo, updateTodoProgress } = useTodoStore();

	React.useEffect(() => {
		const cleanup = setupSocketListeners((update) => {
			updateTodoProgress(update._id, update.progress);
		});

		return cleanup;
	}, [updateTodoProgress]);

	const { isLoading, error } = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const data = await todoApi.getTodos();
			setTodos(data);
			return data;
		},
		refetchOnWindowFocus: false,
	});

	const createTodoMutation = useMutation({
		mutationFn: (newTodo: CreateTodoInput) => todoApi.createTodo(newTodo),
		onSuccess: (newTodo) => {
			addTodo(newTodo);
		},
	});

	const updateTodoMutation = useMutation({
		mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
			todoApi.updateTodo({ id, updates }),
		onSuccess: (updatedTodo) => {
			useTodoStore.getState().updateTodo(updatedTodo);
			queryClient.invalidateQueries(['todos']);
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: todoApi.deleteTodo,
		onSuccess: (_, deletedId) => {
			useTodoStore.getState().deleteTodo(deletedId);
			queryClient.invalidateQueries(['todos']);
		},
	});

	const handleCreateTodo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		const newTodo: CreateTodoInput = {
			name: formData.get('name') as string,
			description: formData.get('description') as string,
			progress: 0
		};

		try {
			await createTodoMutation.mutateAsync(newTodo);
			form.reset();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to create todo:', error);
		}
	};

	const handleEditTodo = async (id: string, updates: { name: string; description: string }) => {
		try {
			await updateTodoMutation.mutateAsync({
				id,
				updates: {
					name: updates.name,
					description: updates.description,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to update todo:', error);
		}
	};

	if (error) {
		return <div className="flex justify-center items-center h-screen">Error loading todos!</div>;
	}

	if (isLoading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-6">Tasks</h1>

				<form onSubmit={handleCreateTodo} className="space-y-4 mb-8">
					<input
						type="text"
						name="name"
						placeholder="Task name"
						required
						className="w-full p-2 border rounded"
					/>
					<textarea
						name="description"
						placeholder="Task description"
						required
						className="w-full p-2 border rounded"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Add Task
					</button>
				</form>
			</div>

			<div className="grid gap-4">
				{todos.length === 0 ? (
					<p className="text-center text-gray-500">No tasks yet. Create your first task!</p>
				) : (
					todos.map((todo: Todo) => (
						<TodoCard
							key={todo._id}
							todo={todo}
							onDelete={deleteTodoMutation.mutate}
							onEdit={handleEditTodo}
						/>
					))
				)}
			</div>
		</div>
	);
}