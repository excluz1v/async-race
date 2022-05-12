import { call, put, select } from 'redux-saga/effects';
import { carsSlice } from '../../store/reducers/carsReducer';
import { pagesSlice } from '../../store/reducers/pagesReducer';
import { winnersSlice } from '../../store/reducers/winnersReducer';
import {
  fetchAllWinnersParams,
  getAllWinnersResponse,
  fetchAllWinnersAction,
  startRaceResponse,
  carInMove,
  carActionType,
  carsStateType,
  pageState,
  winnersType,
  winnersStateType,
  winnerConfig,
  carType,
  deleteActionType,
} from '../../store/types';
import {
  createCar,
  createWinnerReq,
  deleteWinner,
  getAllWinners,
  getSingleCar,
  getSingleWinnerReq,
  getWinnersName,
  startRaceRequest,
  switchRaceToDriveRequest,
  updateWinnerReq,
} from '../../utils/api';
import { findWinner, moveCar } from '../../utils/utils';
import { loadAllCars } from './cars';

const getCarsInMoveState = (state: { cars: carsStateType }) => state.cars.carsInMove;
const getCurrentPageState = (state: { pages: pageState }) => state.pages.garagePage;
const currentWinnersPage = (state: { pages: pageState }) => state.pages.winnerPage;
const currentWinnersState = (state: { winners: winnersStateType }) => state.winners.configs;

function* loadAllWinners(options: fetchAllWinnersParams) {
  const { winners, configs, totalCount }: getAllWinnersResponse = yield call(
    getAllWinners,
    options,
  );
  const winnersWithName: winnersType[] = yield call(getWinnersName, winners)
  yield put(
    winnersSlice.actions.getWinnersFromDB({
      winners: winnersWithName,
      configs,
      currentWinner: false,
      totalCount
    }),
  );
  yield put(
    pagesSlice.actions.setTotalWinnersPages({
      totalCount,
      limit: configs.limit,
    }),
  );
  return winners
}

export function* getAllWinnersWorker(action: fetchAllWinnersAction) {
  try {
    yield loadAllWinners(action.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* getSingleWinnerWorker(id: string) {
  const result: winnersType | null = yield getSingleWinnerReq(id);
  return result;
}

export function* startRaceWorker(action: {
  type: string;
  payload: string[]
}) {
  try {
    // send start engine for all cars at page
    const response: startRaceResponse[] = yield call(startRaceRequest, action.payload);
    // create interval for every car
    const intervalsArr = response.map((el) => {
      const { id, params: { velocity, distance } } = el;
      const intervalId = moveCar(id, velocity, distance);
      return {
        id: el.id,
        intervalId,
      };
    });
    yield put(carsSlice.actions.startRace(intervalsArr));
    yield put(pagesSlice.actions.toggleRace(true));
    const carsInMoveState: carInMove[] = yield select(getCarsInMoveState);
    const finish: string[] = yield call(switchRaceToDriveRequest, action.payload, carsInMoveState);
    const winner = findWinner(finish, response);
    const winnerCarInfo: carType = yield call(getSingleCar, winner.id);
    yield put(winnersSlice.actions.setCurrentWinner({
      id: winner.id,
      name: winnerCarInfo.name,
    }));
    const isWinnerExist: winnersType | null = yield call(getSingleWinnerWorker, winner.id);
    if (isWinnerExist === null) yield call(createWinnerReq, winner);
    else {
      yield call(updateWinnerReq, winner, isWinnerExist);
    }
    const winnerPage: number = yield select(currentWinnersPage);
    const config: winnerConfig = yield select(currentWinnersState);
    const options = {
      page: winnerPage,
      ...config,
    };
    yield call(getAllWinners, options);
    yield put(pagesSlice.actions.toggleRace(false));
  } catch (error) {
    console.log(error);
  }
}

export function* createWinnerWorker(action: carActionType) {
  try {
    const currentPage: number = yield select(getCurrentPageState);
    yield call(createCar, action.payload);
    yield loadAllCars({ page: currentPage });
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}

export function* deleteWinnerWorker(action: deleteActionType) {
  try {
    yield call(deleteWinner, action.payload.id);
  } catch (error) {
    console.log(error);
    // TODO Display error on the screen
  }
}
