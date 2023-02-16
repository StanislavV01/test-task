import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './Slice/RepositorySlice'

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;