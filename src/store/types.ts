import { PayloadAction } from '@reduxjs/toolkit';

export type handler = () => {
  payload: PayloadAction;
  type: string;
};

export type handlerWithArg = (value: number) => {
  payload: PayloadAction;
  type: string;
};
export type handlerWithOutArg = () => {
  type: string;
};

export enum elementAtPageEnum {
  garage = 7,
  winners = 10,
}

export enum winnersAtPageEnum {
  count = 10,
}

export type carType = {
  name: string;
  color: string;
  id: string;
};

export type carActionType = {
  type: string;
  payload: carType;
};

export type getSingleWinnerResponse = {
  id: string;
  wins: number;
  time: number;
};

export type winnersType = getSingleWinnerResponse & {
  name: string;
};


export type winnerConfig = {
  sort: 'time' | 'wins' | 'id';
  order: 'ASC' | 'DESC';
  limit: number;
};

export type winnersStateType = {
  winners: winnersType[];
  configs: winnerConfig;
  totalCount: number;
  currentWinner: {
    id?: string;
    name?: string
  } | false
};

export type carInMove = {
  id: string;
  intervalId: NodeJS.Timeout;
};

export type carsStateType = {
  cars: allCarsType;
  totalCount: number;
  carsInMove: carInMove[];
};

export type allCarsType = carType[];

export type getAllCarsPayload = {
  limit?: number;
  page: number;
};

export type getAllCarsAction = {
  type: string;
  payload: getAllCarsPayload;
};

export type setCarsFromDBAction = {
  type: string;
  payload: {
    cars: carType[];
    totalCount: number;
  };
};

export type addCarInMoveAction = {
  type: string;
  payload: carInMove;
};

export type getSingleCarsAction = {
  type: string;
  payload: string;
};

export type pageState = {
  garagePage: number;
  winnerPage: number;
  totalGaragePages: number;
  totalWinnerPages: number;
  createInput: {
    isActive: boolean;
    name: string;
    color: string;
  };
  isRace: boolean
};

export type getAllResponse = {
  data: carType[];
  count: number;
  limit: number;
};

export type deleteActionType = {
  type: string;
  payload: {
    id: string;
  };
};

export type createCarPayload = {
  name: string;
  color: string;
};

export type createCarAction = {
  type: string;
  payload: createCarPayload;
};

export type fetchAllWinnersParams = winnerConfig & {
  page: number;
};

export type getAllWinnersPayload = fetchAllWinnersParams & {
  winners: winnersType[];
  count: number;
};
export type fetchAllWinnersAction = {
  type: string;
  payload: fetchAllWinnersParams;
};

export type getAllWinnersResponse = {
  winners: winnersType[];
  configs: winnerConfig;
  totalCount: number;
};

export type getAllWinnersAction = {
  type: string;
  payload: winnersStateType;
};

export type engineParams = {
  id: string;
};

export type startEnginePayload = {
  type: string;
  payload: string;
};

export type startRacePayload = {
  type: string;
  payload: string[]
}
export type startEngineResponse = {
  velocity: number;
  distance: number;
}

export type startRaceResponse = {
  id: string;
  params: startEngineResponse
}

export type startRaceAction = {
  type: string;
  payload: carInMove[]
}

export type stopManyCarAction = {
  type: string;
  payload: string[]
}

export type toggleRaceAction = {
  type: string;
  payload: boolean
}
