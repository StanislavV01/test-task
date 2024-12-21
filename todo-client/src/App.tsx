import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoDetails } from './pages/TodoDetails';
import { TodoList } from './pages/TodoList';

const queryClient = new QueryClient();

function App() {
	return (

		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TodoList />} />
					<Route path="/todo/:id" element={<TodoDetails />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App; 