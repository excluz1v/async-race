import { Button, TextField } from '@mui/material';
import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { apiSlice } from '../../store/reducers/apiReducer';
import { pagesSlice } from '../../store/reducers/pagesReducer';

export default function CreateCar() {
  const dispatch = useAppDispatch();
  const { createCar, create100Cars } = apiSlice.actions;
  const { setInputColor, setInputName, toggleCreateInput } = pagesSlice.actions;
  const {
    createInput: { name, color, isActive },
  } = useAppSelector((state) => state.pages);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createCar({ name, color }));
  }

  function nameHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    dispatch(setInputName({ name: e.target.value }));
  }
  function colorHandler(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setInputColor({ color: e.target.value }));
  }
  return (
    <div className="car_create">
      <div className="car_create__toggle">
        {!isActive && (
          <Button
            variant="contained"
            color="success"
            size="small"
            className="create_toggle-on"
            onClick={() => dispatch(toggleCreateInput())}
          >
            Add
          </Button>
        )}
        {isActive && (
          <Button
            variant="contained"
            size="small"
            color="error"
            className="create_toggle-off"
            onClick={() => dispatch(toggleCreateInput())}
          >
            Close
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => dispatch(create100Cars())}
        >
          Create 100 random cars
        </Button>
      </div>
      {isActive && (
        <form className="car_create__form" onSubmit={(e) => submitHandler(e)}>
          <TextField
            label="Car name"
            variant="standard"
            className="car_create__input-name"
            id="car_create_name"
            value={name}
            onChange={(e) => nameHandler(e)}
          />
          <input
            className="car_create__input-color"
            id="car_create_color"
            type="color"
            value={color}
            onChange={(e) => colorHandler(e)}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="small"
            className='car_create__confirm'
          >
            create
          </Button>
        </form>
      )}
    </div>
  );
}
