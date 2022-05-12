import React from 'react';
import { handler } from '../../store/types';

type Props = {
  labelText: string;
  inputValue: string;
  handler: handler;
  isChecked: boolean;
};

export default function CustomCheckbox(props: Props) {
  const {
    labelText, inputValue, handler, isChecked,
  } = props;
  return (
    <label className="custom-checkbox_label">
      <input
        className="custom-checkbox_input"
        type="checkbox"
        value={inputValue}
        onChange={handler}
        checked={isChecked}
      />
      {labelText}
    </label>
  );
}
