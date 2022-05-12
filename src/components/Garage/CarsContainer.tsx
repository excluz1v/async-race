import React from 'react';
import { allCarsType, elementAtPageEnum } from '../../store/types';
import { getPartOfArray } from '../../utils/utils';
import CarItem from './CarItem';

type Props = {
  cars: allCarsType;
  page: number;
};

export default function CarsContainer(props: Props) {
  const { cars, page } = props;
  const currentCars = getPartOfArray(cars, page, elementAtPageEnum.garage);

  return (
    <table className="car_table">
      <thead className="table_head">
        <tr className="table_row">
          <td className="car_item__id">ID</td>
          <td className="car_item__name">Name</td>
          <td className="car_item__color">Color</td>
          <td className="car_item__delete table_delete" />
        </tr>
      </thead>

      <tbody className="table_body">
        {currentCars.map((car, index) => (
          // TODO ЗАменить индекс на уникальный ключ
          <CarItem car={car} key={index} />
        ))}
      </tbody>
    </table>
  );
}
