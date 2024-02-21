import { createSlice } from '@reduxjs/toolkit';
import { Cats } from '../data/cats';

const catsSlice = createSlice({
  name: 'cats',
  initialState: { cats: Cats },
  reducers: {
    addCats: (state: any, action) => {
      state.cats.push(action.payload);
    },
  },
});

export const { addCats } = catsSlice.actions;
export default catsSlice.reducer;