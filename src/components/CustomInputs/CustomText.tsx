import React from "react";
// import { handlerWithArg } from "../../store/types";

type Props = {
  value: string;
  // handler: handlerWithArg;
  buttonHandler: () => {
    payload: undefined;
    type: string;
  };
};

export default function CustomText(props: Props) {
  const { value, /* handler, */ buttonHandler } = props;

  return (
    <div className="settings_find-wrapper">
      <input
        className="settings_find"
        type="text"
        // onChange={(e) => handler(e.target.value)}
        value={value}
        autoFocus
        autoComplete="off"
        placeholder="Поиск по названию"
      />
      <button
        className="settings_find-close"
        onClick={() => buttonHandler()}
        type="button"
        aria-label="clear text"
      />
    </div>
  );
}
