import { elementAtPageEnum, startRaceResponse } from '../store/types';

export function getPartOfArray<Type>(
  arr: Array<Type>,
  pageNumber: number = 1,
  count: elementAtPageEnum = 7,
) {
  if (count >= arr.length) return arr;
  const startIndex = (pageNumber - 1) * count;
  const endIndex = arr[pageNumber * count] ? pageNumber * count : arr.length;
  return arr.slice(startIndex, endIndex);
}

export function generatePagesList(
  totalPages: number,
  currPage: number,
  range: number = 5,
) {
  const numbersOfPages: number[] = [];
  numbersOfPages.push(currPage);
  for (let i = 1; i < range; i += 1) {
    const leftNeighbor = currPage - i;
    const rightNeighbor = currPage + i;
    if (leftNeighbor > 0 && numbersOfPages.length <= range) {
      numbersOfPages.push(leftNeighbor);
    }
    if (totalPages >= rightNeighbor && numbersOfPages.length <= range) {
      numbersOfPages.push(rightNeighbor);
    }
  }
  return numbersOfPages.sort((a, b) => a - b);
}

export function moveCar(id: string, velocity: number, distance: number) {
  let startPos = 0;
  const time = distance / velocity / 60;
  const carImg: HTMLElement = document.getElementById(id)!;
  function frame() {
    if (startPos > 90) {
      clearInterval(intervalId);
    } else {
      startPos += 1;
      carImg.style.left = `${startPos}%`;
    }
  }
  const intervalId = setInterval(frame, time);
  return intervalId;
}

export function resetCar(id: string) {
  const carImg: HTMLElement = document.getElementById(id)!;
  carImg.style.left = `${0}%`;
}

function pickRandomValue(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function createRandomCar(brandArr:string[], nameArr:string[]) {
  return `${pickRandomValue(brandArr)} ${pickRandomValue(nameArr)}`;
}

export function createRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function findWinner(finishedArr:string[], allCars:startRaceResponse[]) {
  const timeArr = finishedArr.map((el) => {
    const finishedCar = allCars.find((car) => car.id === el)!;
    const time = Math.floor(finishedCar.params.distance / finishedCar.params.velocity / 100);
    return {
      id: el,
      time,
    };
  });
  return timeArr.sort((a, b) => a.time - b.time)[0];
}
