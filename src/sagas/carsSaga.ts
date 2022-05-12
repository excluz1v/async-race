import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getAllCarsWorker,
  updateCarWorker,
  deleteCarWorker,
  createCarWorker,
  startEngineWorker,
  stopEngineWorker,
  createManyCarsWorker,
} from './handlers/cars';

export default function* carsSagaWatcher() {
  yield takeLatest('api/getAllCars', getAllCarsWorker);
  yield takeLatest('api/updateCar', updateCarWorker);
  yield takeLatest('api/deleteCar', deleteCarWorker);
  yield takeLatest('api/createCar', createCarWorker);
  yield takeEvery('api/startEngine', startEngineWorker);
  yield takeEvery('api/stopEngine', stopEngineWorker);
  yield takeLatest('api/create100Cars', createManyCarsWorker);
}
