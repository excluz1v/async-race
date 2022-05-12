import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { carsSlice } from '../../store/reducers/carsReducer';
import { resetCar } from '../../utils/utils';

type Props = {
  disabled: boolean;
}

export default function ResetRace(props: Props) {
  const { disabled } = props;
  const { carsInMove } = useAppSelector((state) => state.cars);
  const dispatch = useAppDispatch()
  const { stopManyCar } = carsSlice.actions

  function handler() {
    const ids = carsInMove.map((car) => {
      resetCar(car.id)
      return car.id
    });
    dispatch(stopManyCar(ids))
  }

  return (
    <Button
      onClick={() => handler()}
      variant="contained"
      color="error"
      size="small"
      disabled={disabled}
    >
      Reset Cars
    </Button>
  );
}
