import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import {
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import carsReducer from './reducers/carsReducer';
import pagesReducer from './reducers/pagesReducer';
import winnersReducer from './reducers/winnersReducer';
import rootSaga from '../sagas/rootSaga';
import apiReducer from './reducers/apiReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// };

const sagaMiddleWeare = createSagaMiddleware();

const rootReducer = combineReducers({
  pages: pagesReducer,
  cars: carsReducer,
  winners: winnersReducer,
  api: apiReducer,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    thunk: false,
  }).concat(sagaMiddleWeare),
});

sagaMiddleWeare.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
