import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  min: number;
  max: number;
  title: string;
  handler: (value: number[]) => {
    payload: PayloadAction;
    type: string;
  };
  value: number[];
};

const minDistance = 5;

function valuetext(value: number) {
  return value.toString();
}

export default function CustomRange(props: Props) {
  const {
    min, max, title, value, handler,
  } = props;
  const dispatch = useAppDispatch();

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      dispatch(
        handler([Math.min(newValue[0], value[1] - minDistance), value[1]]),
      );
    } else {
      dispatch(
        handler([value[0], Math.max(newValue[1], value[0] + minDistance)]),
      );
    }
  };

  return (
    <Box className="custom_range-container">
      <p>{title}</p>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={debounce(handleChange, 1)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={min}
        max={max}
      />
      <div className="custom_range__wrapper">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </Box>
  );
}
