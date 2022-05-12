import { createSlice } from '@reduxjs/toolkit';
import {
  carActionType,
  createCarAction,
  deleteActionType,
  fetchAllWinnersAction,
  getAllCarsAction,
  getSingleCarsAction,
  startEnginePayload,
  startRacePayload,
} from '../types';

const initialState = {};

export const apiSlice = createSlice({
  initialState,
  name: 'api',
  reducers: {
    getAllCars(state, action: getAllCarsAction) {},
    getSingleCar(state, action: getSingleCarsAction) {},
    updateCar(state, action: carActionType) {},
    deleteCar(state, action: deleteActionType) {},
    createCar(state, action: createCarAction) {},
    getAllWinners(state, action: fetchAllWinnersAction) {},
    startEngine(state, action: startEnginePayload) { },
    stopEngine(state, action: startEnginePayload) { },
    create100Cars(state) { },
    startRace(state, action: startRacePayload) { },
    resetRace(state) {},
  },
});

export default apiSlice.reducer;
