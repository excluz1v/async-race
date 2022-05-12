import { call, put, select } from 'redux-saga/effects';
import { carsSlice } from '../../store/reducers/carsReducer';
import { pagesSlice } from '../../store/reducers/pagesReducer';
import {
  carActionType,
  deleteActionType,
  getAllCarsAction,
  getAllCarsPayload,
  getAllResponse,
  pageState,
  startEngineResponse,
} from '../../store/types';
import {
  getAllCars,
  updateCar,
  deleteCar,
  createCar,
  engineRequest,
  switchToDriveRequest,
  createManyCarsRequest,
} from '../../utils/api';
import { brands, names } from '../../utils/carNames';
import {
  createRandomCar, createRandomColor, moveCar, resetCar,
} from '../../utils/utils';
import { deleteWinnerWorker } from './winners';

const getCurrentPageState = (state: { pages: pageState }) => state.pages.garagePage;

export function* loadAllCars(options: getAllCarsPayload) {
  const { data, count, limit }: getAllResponse = yield call(
    getAllCars,
    options,
  );
  yield put(
    carsSlice.actions.setCarsFromDB({
      cars: data,
      totalCount: count,
    }),
  );
  yield put(
    pagesSlice.actions.setTotalGaragePages({
      limit,
      totalCount: count,
    }),
  );
}

export function* getAllCarsWorker(action: getAllCarsAction) {
  try {
    yield loadAllCars(action.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* updateCarWorker(action: carActionType) {
  try {
    const currentPage: number = yield select(getCurrentPageState);
    yield call(updateCar, action.payload);
    yield loadAllCars({ page: currentPage });
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* deleteCarWorker(action: deleteActionType) {
  try {
    const currentPage: number = yield select(getCurrentPageState);
    yield call(deleteCar, action.payload.id);
    yield loadAllCars({ page: currentPage });
    yield call(deleteWinnerWorker, action);
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* createCarWorker(action: carActionType) {
  try {
    const currentPage: number = yield select(getCurrentPageState);
    yield call(createCar, action.payload);
    yield loadAllCars({ page: currentPage });
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* startEngineWorker(action: {
  type: string;
  payload: string;
}) {
  try {
    const params = {
      id: action.payload,
      status: 'started',
    };
    const data:startEngineResponse = yield call(engineRequest, params);
    const intervalId = moveCar(action.payload, data.velocity, data.distance);
    yield put(carsSlice.actions.addCarInMove({
      id: action.payload,
      intervalId,
    }));
    const res: boolean = yield call(switchToDriveRequest, action.payload);
    if (!res) {
      yield put(carsSlice.actions.stopCar(action.payload));
    }
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* stopEngineWorker(action: {
  type: string;
  payload: string;
}) {
  try {
    const params = {
      id: action.payload,
      status: 'stopped',
    };
    // send request stop engine
    yield call(engineRequest, params);
    // update state
    yield put(carsSlice.actions.stopCar(action.payload));
    resetCar(action.payload);
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* createManyCarsWorker() {
  const arr = new Array(100).fill(1).map(() => ({
    name: createRandomCar(brands, names),
    color: createRandomColor(),
  }));
  try {
    yield call(createManyCarsRequest, arr);
    const currentPage: number = yield select(getCurrentPageState);
    yield loadAllCars({ page: currentPage });
  } catch (error) {
    console.log(error);
  }
}
