import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  carInMove,
  carType,
  createCarPayload,
  fetchAllWinnersParams,
  getAllCarsPayload,
  getSingleWinnerResponse,
  winnersType,
} from '../store/types';

const baseUrl = 'http://127.0.0.1:3000';

export async function getAllCars(opt: getAllCarsPayload) {
  const limit = opt.limit ? opt.limit : 7;

  const response: AxiosResponse<carType[]> = await axios.get(
    `${baseUrl}/garage?_page=${opt.page}&_limit=${limit}`,
  );
  const {
    data,
    headers: { 'x-total-count': count },
  } = response;
  return { data, count: +count, limit };
}

export async function getSingleCar(id: string) {
  const response: AxiosResponse<carType> = await axios.get(
    `${baseUrl}/garage/${id}`,
  );
  const { data } = response;
  return data;
}

export async function updateCar(obj: carType) {
  const response: AxiosResponse<carType> = await axios.put(
    `${baseUrl}/garage/${obj.id}`,
    {
      name: obj.name,
      color: obj.color,
    },
  );
  const { data } = response;
  return data;
}

export async function createCar(obj: createCarPayload) {
  const response: AxiosResponse<carType> = await axios.post(
    `${baseUrl}/garage`,
    obj,
  );
  const { data } = response;
  return data;
}

export async function deleteCar(id: string) {
  await axios.delete(`${baseUrl}/garage/${id}`);
}

export async function getAllWinners(opt: fetchAllWinnersParams) {
  const response: AxiosResponse<winnersType[]> = await axios.get(
    `${baseUrl
    }/winners?_page=${opt.page}&_limit=${opt.limit}&_sort=${opt.sort}&_order=${opt.order}`,
  );
  const {
    data: winners,
    headers: { 'x-total-count': count },
  } = response;

  return {
    winners,
    totalCount: +count,
    configs: {
      limit: opt.limit,
      sort: opt.sort,
      order: opt.order,
    },
  };
}

export async function engineRequest(obj: {
  id: string,
  status: string
}) {
  try {
    const response: AxiosResponse<{
      velocity: number;
      distance: number;
    }> = await axios.patch(
      `${baseUrl}/engine?id=${obj.id}&status=${obj.status}`,
      obj,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function switchToDriveRequest(id: string) {
  try {
    const response: AxiosResponse<boolean> = await axios.patch(
      `${baseUrl}/engine?id=${id}&status=drive`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const res = err.response!;
    if (res.status === 500) return false;
  }
}

export async function createManyCarsRequest(arr: createCarPayload[]) {
  await Promise.allSettled(arr.map((el) => {
    createCar(el);
    return el;
  }));
}

export async function startRaceRequest(arr: string[]) {
  const result = await Promise.allSettled(arr.map((el) => engineRequest({
    id: el,
    status: 'started',
  })));
  return result.map((el, index) => (el.status === 'fulfilled'
    ? {
      id: arr[index],
      params: el.value,
    }
    : false)).filter((el) => el !== false);
}

export async function raceDrive(id: string, catsInMoveState: carInMove[]) {
  try {
    await axios.patch(
      `${baseUrl}/engine?id=${id}&status=drive`,
    );
    return id;
  } catch (error) {
    const err = error as AxiosError;
    const res = err.response!;
    if (res.status === 500) {
      const brokenCar = catsInMoveState.find((car) => car.id === id)!;
      clearInterval(brokenCar?.intervalId);
    }
  }
}

export async function switchRaceToDriveRequest(arr: string[], catsInMoveState: carInMove[]) {
  try {
    const results = await Promise.allSettled(
      arr.map((el) => raceDrive(el, catsInMoveState)),
    );
    return results.map((el) => {
      if (el.status === 'fulfilled' && el.value) {
        return el.value;
      } return null;
    }).filter((el) => el !== null);
  } catch (error) {
    console.log(error);
  }
}

export async function createWinnerReq(winner: { id: string, time: number }) {
  const reqBody = { ...winner, wins: 1 };
  const response: AxiosResponse<carType> = await axios.post(
    `${baseUrl}/winners`,
    reqBody,
  );
  const { data } = response;
  return data;
}

export async function getSingleWinnerReq(id: string) {
  try {
    const response: AxiosResponse<winnersType> = await axios.get(
      `${baseUrl}/winners/${id}`,
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateWinnerReq(obj: { id: string, time: number }, winnerInBase: winnersType) {
  let reqBody: {
    wins: number,
    time: number
  };
  if (obj.time < winnerInBase.time) {
    reqBody = {
      wins: winnerInBase.wins + 1,
      time: obj.time,
    };
  } else {
    reqBody = {
      wins: winnerInBase.wins + 1,
      time: winnerInBase.time,
    };
  }

  await axios.put(
    `${baseUrl}/winners/${obj.id}`,
    reqBody,
  );
}

export async function deleteWinner(id: string) {
  await axios.delete(`${baseUrl}/winners/${id}`);
}

export async function stopRaceReq(arr: carInMove[]) {
  const result = await Promise.allSettled(arr.map((car) => engineRequest({ id: car.id, status: 'stopped' })));
  return result;
}

export async function getWinnersName(arr: getSingleWinnerResponse[]) {

  const response: PromiseSettledResult<AxiosResponse<carType>>[] = await Promise.allSettled(arr.map(w => axios.get(
    `${baseUrl}/garage/${w.id}`,
  )))
  const result = response.map(w => {
    if (w.status === 'fulfilled') return {
      name: w.value.data.name,
      id: w.value.data.id
    }
  })
  return arr.map(el => {
    const { name } = result.find(w => w?.id === el.id)!
    return {
      ...el,
      name: name ? name : ''
    }
  })

}