import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { apiSlice } from '../../store/reducers/apiReducer';
import { carType } from '../../store/types';
import { getSingleCar } from '../../utils/api';
import CarImage from './CarImage';
import TableData from './TableData';

type Props = {
  car: carType;
};

export default function CarItem(props: Props) {
  const {
    car: { color, id, name },
  } = props;
  const dispatch = useAppDispatch();

  const {
    updateCar, deleteCar, startEngine, stopEngine,
  } = apiSlice.actions;

  const { carsInMove } = useAppSelector((state) => state.cars);
  const { isRace } = useAppSelector((state) => state.pages);

  const isBlocked = carsInMove.some((car) => car.id === id);

  const [editName, setEditName] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [nameHolder, setNameHolder] = useState(name);
  const [colorHolder, setColorHolder] = useState(color);

  function saveChanges() {
    const updatedCar = {
      id,
      color: colorHolder,
      name: nameHolder,
    };
    dispatch(updateCar(updatedCar));
  }

  async function nameDoubleClick() {
    try {
      const currentCar = await getSingleCar(id);
      setNameHolder(currentCar.name);
      setEditName(true);
    } catch (error) {
      // TODO Show error
      console.log(error);
    }
  }
  async function colorDoubleClick() {
    try {
      const currentCar = await getSingleCar(id);
      setColorHolder(currentCar.color);
      setEditColor(true);
    } catch (error) {
      // TODO Show error
      console.log(error);
    }
  }

  return (
    <tr className="car_item table_row">
      <td className="car_item__id table_data">{id}</td>
      <td className="table_data car_item__name">
        <div className="car_engine">
          <button
            onClick={() => dispatch(startEngine(id))}
            type="button"
            disabled={isBlocked}
            className='car_engine__start'
          >
            Start
          </button>
          <button
            onClick={() => dispatch(stopEngine(id))}
            type="button"
            disabled={!isBlocked}
            className='car_engine__stop'
          >
            Stop
          </button>
        </div>
        <TableData
          inputValue={nameHolder}
          condition={editName}
          inputHandler={(e) => setNameHolder(e.target.value)}
          hideButtonHandler={() => setEditName(false)}
          divClickHandler={() => nameDoubleClick()}
          saveButtonHandler={() => {
            setEditName(false);
            saveChanges();
          }}
          tableText={name}
          inputType="text"
          className='car_name'
        />
      </td>
      <td className="table_data car_item__color">
        <TableData
          condition={editColor}
          inputValue={colorHolder}
          inputHandler={(e) => setColorHolder(e.target.value)}
          hideButtonHandler={() => setEditColor(false)}
          divClickHandler={() => colorDoubleClick()}
          saveButtonHandler={() => {
            setEditColor(false);
            saveChanges();
          }}
          tableText={<CarImage id={id} />}
          style={{ color }}
          inputType="color"
          className='car_color'
        />
      </td>

      <td className="car_item__delete table_delete">
        <button
          onClick={() => dispatch(deleteCar({ id }))}
          type="button"
          disabled={isRace}
        >
        </button>
      </td>
    </tr>
  );
}
