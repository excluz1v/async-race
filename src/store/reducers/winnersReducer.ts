import { createSlice } from '@reduxjs/toolkit';
import { getAllWinnersAction, winnersStateType } from '../types';

const initialState: winnersStateType = {
  winners: [],
  configs: {
    limit: 10,
    sort: 'id',
    order: 'ASC',
  },
  totalCount: 0,
  currentWinner: false,
};

export const winnersSlice = createSlice({
  initialState,
  name: 'winners',
  reducers: {
    getWinnersFromDB(state, action: getAllWinnersAction) {
      state = action.payload;
      return state;
    },
    setCurrentWinner(state, action) {
      state.currentWinner = action.payload;
    },
  },
});

export default winnersSlice.reducer;
