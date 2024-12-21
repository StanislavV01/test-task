import React from 'react';
import { CreateTodoInput } from '../types/todo';

interface TodoFormProps {
	// eslint-disable-next-line no-unused-vars
	onSubmit: (values: CreateTodoInput) => void;
	initialValues?: Partial<CreateTodoInput>;
	submitLabel?: string;
}

export function TodoForm({ onSubmit, initialValues = { name: '', description: '' }, submitLabel = 'Create Task' }: TodoFormProps){
	// eslint-disable-next-line no-undef
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// eslint-disable-next-line no-undef
		const formData = new FormData(e.currentTarget);

		const formValues: CreateTodoInput = {
			name: formData.get('name') as string,
			description: formData.get('description') as string,
			progress: initialValues.progress ?? 0,
		};

		onSubmit(formValues);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">
					Name
				</label>
				<input
					id="name"
					name="name"
					defaultValue={initialValues.name}
					className="w-full p-2 border rounded"
					placeholder="Enter task name"
					required
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					id="description"
					name="description"
					defaultValue={initialValues.description}
					className="w-full p-2 border rounded"
					placeholder="Enter task description"
					required
				/>
			</div>
			<button
				type="submit"
				className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
			>
				{submitLabel}
			</button>
		</form>
	);
} 