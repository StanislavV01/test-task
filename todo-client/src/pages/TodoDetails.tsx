import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';
import { TodoForm } from '../components/TodoForm';
import { CreateTodoInput, Todo } from '../types/todo';
import { useTodoStore } from '../store/todoStore';

export function TodoDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { updateTodo } = useTodoStore();

	const { data: todo, isLoading, error } = useQuery({
		queryKey: ['todo', id],
		queryFn: async () => {
			if (!id) throw new Error('No todo ID provided');
			return await todoApi.getTodo(id);
		},
		enabled: !!id,
		retry: 1,
		staleTime: 30000
	});

	const updateTodoMutation = useMutation({
		mutationFn: async (values: CreateTodoInput) => {
			if (!id) throw new Error('No todo ID provided');
			return await todoApi.updateTodo({
				id,
				updates: {
					name: values.name,
					description: values.description,
					progress: todo?.progress ?? 0
				}
			});
		},
		onSuccess: (updatedTodo: Todo) => {
			updateTodo(updatedTodo);
			queryClient.setQueryData(['todo', id], updatedTodo);
			queryClient.invalidateQueries({ queryKey: ['todos'] });
			navigate('/');
		},
		onError: (error) => {
			console.error('Failed to update todo:', error);
		}
	});

	const handleUpdate = async (values: CreateTodoInput): Promise<void> => {
		try {
			await updateTodoMutation.mutateAsync(values);
		} catch (error) {
			console.error('Failed to update todo:', error);
		}
	};

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				Error loading todo: {error instanceof Error ? error.message : 'Unknown error'}
			</div>
		);
	}

	if (isLoading || !todo) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-2xl font-bold mb-6">Edit Todo</h2>

				<TodoForm
					initialValues={{
						name: todo.name,
						description: todo.description,
						progress: todo.progress
					}}
					onSubmit={handleUpdate}
					submitLabel="Update Todo"
					loading={updateTodoMutation.isPending}
				/>

				<div className="flex justify-center mt-6">
					<button
						onClick={() => navigate('/')}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
					>
						Back to List
					</button>
				</div>
			</div>
		</div>
	);
} 