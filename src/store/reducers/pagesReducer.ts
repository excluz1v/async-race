import { createSlice } from '@reduxjs/toolkit';
import { pageState, toggleRaceAction } from '../types';

// initialize pages
const initialState: pageState = {
  garagePage: 1,
  winnerPage: 1,
  totalGaragePages: 1,
  totalWinnerPages: 1,
  createInput: {
    isActive: false,
    name: '',
    color: '#000000',
  },
  isRace: false,
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    nextWinnersPage(state) {
      state.winnerPage += 1;
    },
    nextGaragePage(state) {
      state.garagePage += 1;
    },
    prevWinnersPage(state) {
      state.winnerPage -= 1;
    },
    prevGaragePage(state) {
      state.garagePage -= 1;
    },
    setGaragePage(state, action) {
      state.garagePage = action.payload;
    },
    setWinnersPage(state, action) {
      state.winnerPage = action.payload;
    },
    toggleCreateInput(state) {
      state.createInput.name = '';
      state.createInput.color = '#000000';
      state.createInput.isActive = !state.createInput.isActive;
    },
    setInputColor(state, action) {
      const { color } = action.payload;
      state.createInput.color = color;
    },
    setInputName(state, action) {
      const { name } = action.payload;
      state.createInput.name = name;
    },
    setTotalGaragePages(state, action) {
      const { limit, totalCount } = action.payload;
      state.totalGaragePages = Math.ceil(totalCount / limit);
    },
    setTotalWinnersPages(state, action) {
      const { limit, totalCount } = action.payload;
      state.totalWinnerPages = Math.ceil(totalCount / limit);
    },
    toggleRace(state, action: toggleRaceAction) {
      state.isRace = action.payload;
    },
  },
});

export default pagesSlice.reducer;
