import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

export const setupStore = (preloadedState = initialState) => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
    preloadedState,
  });
};
