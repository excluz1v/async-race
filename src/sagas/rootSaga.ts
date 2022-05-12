import { fork } from 'redux-saga/effects';
import carsSagaWatcher from './carsSaga';
import winnersSagaWatcher from './winnersSaga';

export default function* rootSaga() {
  yield fork(carsSagaWatcher);
  yield fork(winnersSagaWatcher);
  //   yield fork(saga2)
  // or yield [
  // fork(saga1),
  // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
  // fork(saga2),
  // ]
}
