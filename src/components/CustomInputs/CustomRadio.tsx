import React from 'react';
import { handlerWithArg } from '../../store/types';

type Props = {
  name: string;
  id: string;
  value: string;
  defaultChecked?: boolean;
  labelText: string;
  handler?: handlerWithArg;
};

export default function CustomRadio(props: Props) {
  const {
    name,
    id,
    value,
    defaultChecked,
    labelText,
    handler = () => {},
  } = props;
  return (
    <div className="custom-radio">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={false || defaultChecked}
        onChange={(e) => handler(+e.target.value)}
      />
      <label className="filter_form__label" htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
}

CustomRadio.defaultProps = {
  handler: () => true,
  defaultChecked: false,
};
