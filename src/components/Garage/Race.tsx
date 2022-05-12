import { Button } from '@mui/material';
import React from 'react';

type Props = {
   onclick: () => {
        payload: string[];
        type: string;
  }
  disabled: boolean;
}

export default function Race(props: Props) {
  const { onclick, disabled } = props;
  return (
    <Button
      onClick={onclick}
      variant="contained"
      color="info"
      size="small"
      disabled={disabled}
    >
      Start Race
    </Button>
  );
}
