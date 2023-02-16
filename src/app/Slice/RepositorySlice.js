import { createSlice } from '@reduxjs/toolkit';

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    repositoriesLoading: (state) => {
      state.status = 'loading';
    },
    repositoriesReceived: (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    },
    repositoriesRequestFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { repositoriesLoading, repositoriesReceived, repositoriesRequestFailed } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;