# Todo List Application

This is a full-stack Todo List application built with modern web technologies.

## Features

- Create, read, update and delete todos
- Real-time updates using WebSocket
- Responsive design with Tailwind CSS
- State management with Zustand
- Data fetching and caching with React Query
- Form handling with validation
- TypeScript for type safety

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router for navigation
- TanStack Query (React Query) for data fetching
- Zustand for state management
- Socket.io Client for real-time updates
- Tailwind CSS for styling
- Axios for HTTP requests

### Development Tools
- ESLint for code linting
- PostCSS & Autoprefixer
- TypeScript compiler

## Getting Started

1. Clone the repository
2. Install dependencies:
	cd server
	npm install
	cd ../todo-client
	npm install	

3. Start the development server:
	Start docker before running the following command:
	cd server
	npm run up
	
	Run the following command to start the development server:
	cd ../todo-client
	npm run dev
