import { takeLatest } from 'redux-saga/effects';
import { getAllWinnersWorker, startRaceWorker } from './handlers/winners';

export default function* winnersSagaWatcher() {
  yield takeLatest('api/getAllWinners', getAllWinnersWorker);
  yield takeLatest('api/startRace', startRaceWorker);
}
