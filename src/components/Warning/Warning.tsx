import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

type Props = {
  count: number;
  handler: () => {
    payload: undefined;
    type: string;
  };
};

export default function Warning(props: Props) {
  const { count, handler } = props;

  return (
    <Alert className="alert" severity="error" onClose={() => handler()}>
      <AlertTitle>Ошибка</AlertTitle>
      Извините, все слоты заполнены.
      {' '}
      <strong>
        Максимум
        {count}
        {' '}
        слотов
        {' '}
      </strong>
    </Alert>
  );
}
