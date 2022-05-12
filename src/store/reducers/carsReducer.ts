import { createSlice } from '@reduxjs/toolkit';
import {
  addCarInMoveAction,
  carsStateType,
  setCarsFromDBAction,
  startEnginePayload,
  startRaceAction,
  stopManyCarAction,
} from '../types';

const initialState: carsStateType = {
  cars: [],
  totalCount: 0,
  carsInMove: [],
};

export const carsSlice = createSlice({
  initialState,
  name: 'cars',
  reducers: {
    setCarsFromDB(state, action: setCarsFromDBAction) {
      const { cars, totalCount } = action.payload;
      state.cars = cars;
      state.totalCount = totalCount;
      return state;
    },
    addCarInMove(state, action: addCarInMoveAction) {
      state.carsInMove.push(action.payload);
    },
    stopCar(state, action: startEnginePayload) {
      const id = action.payload;
      state.carsInMove = state.carsInMove.map((car) => {
        if (car.id === id) {
          clearInterval(car.intervalId);
        } return car;
      }).filter((car) => car.id !== id);
      return state;
    },
    startRace(state, action:startRaceAction) {
      state.carsInMove = action.payload;
      return state;
    },
    stopManyCar(state, action: stopManyCarAction) {
      const arr = action.payload;
      state.carsInMove = state.carsInMove.map((car) => {
        if (arr.includes(car.id)) {
          clearInterval(car.intervalId);
        } return car;
      }).filter((car) => !arr.includes(car.id));
      return state;
    },
  },
});

export default carsSlice.reducer;
