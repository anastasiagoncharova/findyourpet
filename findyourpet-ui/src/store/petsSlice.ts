import { createSlice } from '@reduxjs/toolkit';
import { Pets } from '../data/pets';

const petsSlice = createSlice({
  name: 'pets',
  initialState: { pets: Pets, selectedPets: [] },
  reducers: {
    addPets: (state: any, action) => {
      state.pets.push(action.payload);
    },
    addSelectedPets: (state: any, action) => {
      return {
        ...state,
        selectedPets: [...state.selectedPets, action.payload]
      };
    }
  },
});

export const { addPets, addSelectedPets } = petsSlice.actions;
export default petsSlice.reducer;