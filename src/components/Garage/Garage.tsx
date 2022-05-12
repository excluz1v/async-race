import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { apiSlice } from '../../store/reducers/apiReducer';
import { pagesSlice } from '../../store/reducers/pagesReducer';
import { carsSlice } from '../../store/reducers/carsReducer';
import PageSlider from '../PageSlider/PageSlider';
import ResetRace from '../Race/ResetRace';
import CarsContainer from './CarsContainer';
import CreateCar from './CreateCar';
import Race from './Race';
import { resetCar } from '../../utils/utils';

export default function Home() {
  const dispatch = useAppDispatch();
  const { cars, totalCount, carsInMove } = useAppSelector((state) => state.cars);
  const { garagePage: page, totalGaragePages, isRace } = useAppSelector(
    (state) => state.pages,
  );

  const { nextGaragePage, prevGaragePage, setGaragePage } = pagesSlice.actions;
  const { getAllCars, startRace } = apiSlice.actions;
  const { stopManyCar } = carsSlice.actions;

  const arrOfId = cars.map((car) => car.id);

  function nextPageHandler() {
    if (carsInMove.length > 0) {
      const ids = carsInMove.map(car => {
        resetCar(car.id)
        return car.id
      })
      dispatch(stopManyCar(ids))
    }
    dispatch(nextGaragePage())
  }

  function prevPageHandler() {
    if (carsInMove.length > 0) {
      const ids = carsInMove.map(car => {
        resetCar(car.id)
        return car.id
      })
      dispatch(stopManyCar(ids))
    }
    dispatch(prevGaragePage())
  }

  function setPagehandler(page: number) {
    if (carsInMove.length > 0) {
      const ids = carsInMove.map(car => {
        resetCar(car.id)
        return car.id
      })
      dispatch(stopManyCar(ids))
    }
    dispatch(setGaragePage(page))
  }
  useEffect(() => {
    dispatch(getAllCars({ page }));
  }, [page]);

  return (
    <div className="main">
      <CreateCar />
      <div className="car_count">
        <div>
          <b>Total cars:</b>
          {' '}
          {totalCount}
        </div>
        <div className='car_race__container'>
          <Race disabled={isRace} onclick={() => dispatch(startRace(arrOfId))} />
          <ResetRace disabled={isRace} />
        </div>
      </div>
      <CarsContainer cars={cars} page={page} />
      <PageSlider
        totalPages={totalGaragePages}
        currentPage={page}
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
        setPage={setPagehandler}
        hide={isRace}
      />
    </div>
  );
}
