import { createSlice } from '@reduxjs/toolkit';
import { User } from '../data/user';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: { userData: User },
  reducers: {
    addUserData: (state: any, action) => {
      state.userData.push(action.payload);
    },
  },
});

export const { addUserData } = userDataSlice.actions;
export default userDataSlice.reducer;