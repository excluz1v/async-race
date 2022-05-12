import React from 'react';
import { handler } from '../../store/types';

type Props = {
  imagePath: string;
  text?: string;
  isActive?: boolean;
  handler?: handler;
};

export default function ButtonIcon(props: Props) {
  const {
    imagePath, text, isActive, handler,
  } = props;
  let strikeout: string = '';
  if (!isActive) strikeout = 'strikeout';
  return (
    <div className="button-icon_wrapper">
      <div className="button-icon_container">
        <button
          onClick={handler}
          style={{ backgroundImage: `url(${imagePath})` }}
          className={`button-icon_btn ${strikeout}`}
          type="button"
          aria-label="favorite"
        />
      </div>

      {text && <p className="button-icon_text">{text}</p> }
    </div>
  );
}

ButtonIcon.defaultProps = {
  text: '',
  isActive: false,
  handler: () => true,
};
