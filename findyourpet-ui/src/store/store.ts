import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './petsSlice';
import userDataReducer from './userDataSlice';

const store = configureStore({
  reducer: {
    pets: petsReducer,
    userData: userDataReducer
  },
});

export default store;