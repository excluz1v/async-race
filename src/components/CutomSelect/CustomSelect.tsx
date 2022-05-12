import { MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { handlerWithArg } from '../../store/types';

type Props = {
  handler: handlerWithArg;
  value: string;
};

const useStyles = makeStyles(() => ({
  select: {
    '& fieldset': {
      borderColor: '#fff',
    },
    '& svg': {
      color: '#fff',
    },
  },
}));

export default function CustomSelect(props: Props) {
  const { handler, value } = props;
  const classes = useStyles();

  return (
    <Select
      value={value}
      // onChange={(e) => handler(e.target.value)}
      sx={{
        color: '#fff',
      }}
      className={classes.select}
    >
      <MenuItem value="asc"> По возрастанию</MenuItem>
      <MenuItem value="desc">По убыванию</MenuItem>
    </Select>
  );
}
