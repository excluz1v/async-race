import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { handlerWithArg } from "../../store/types";

type Props = {
  list: number[];
  currentPage: number;
  handler: (p: number) => void;
};

export default function Pagination(props: Props) {
  const { list, currentPage, handler } = props;
  return (
    <ul className="page_slider__list">
      {list.map((el, ind) => {
        // TODO change ind to uniq id
        let current = "";
        if (el === currentPage) current = "current";
        return (
          <li key={ind} className="page_slider__item">
            <button
              className={current}
              onClick={() => handler(el)}
              type="button"
            >
              {el}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
