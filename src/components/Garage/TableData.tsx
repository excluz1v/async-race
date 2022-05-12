import React, { ReactElement } from "react";
import CustomButton from "../CustomButton/CustomButton";

type Props = {
  condition: boolean;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  hideButtonHandler: () => void;
  divClickHandler: () => void;
  saveButtonHandler: () => void;
  tableText: string | ReactElement;
  color?: string;
  style?: React.HTMLAttributes<HTMLDivElement> | undefined;
  inputType: "text" | "color";
  className: string;
};

export default function TableData(props: Props) {
  const {
    condition,
    inputHandler,
    inputValue,
    hideButtonHandler,
    divClickHandler,
    saveButtonHandler,
    tableText,
    style,
    inputType,
    className
  } = props;
  return (
    <>
      {condition ? (
        <div className={className}>
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => {
              inputHandler(e);
            }}
          />
          <CustomButton handler={saveButtonHandler} text="Save" />
          <CustomButton handler={hideButtonHandler} text="Cancel" />
        </div>
      ) : (
        <div className={className} style={style}>
          <span onDoubleClick={divClickHandler}>{tableText}</span>
        </div>
      )}
    </>
  );
}
