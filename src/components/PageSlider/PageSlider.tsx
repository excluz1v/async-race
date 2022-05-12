import { Button } from '@mui/material';
import React from 'react';
import generatePagesList from './generatePageList';
import Pagination from './Pagination';

type Props = {
  totalPages: number;
  currentPage: number;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  setPage: (p: number) => void;
  hide?: boolean
};

export default function PageSlider(props: Props) {
  const {
    totalPages, currentPage, nextPageHandler, prevPageHandler, setPage, hide,
  } = props;

  const showPrevButton = currentPage === 1;
  const showNextButton = currentPage === totalPages;

  const list = generatePagesList(totalPages, currentPage);

  const hideCLassName = hide
    ? 'hide'
    : '';
  return (
    <div className={`page_slider ${hideCLassName}`}>
      <Button
        onClick={() => setPage(1)}
        className="page_slider__begin"
        disabled={showPrevButton}
        type="button"
        variant='outlined'
      >
        to begin
      </Button>
      <button
        onClick={() => prevPageHandler()}
        className="page_slider__prev"
        disabled={showPrevButton}
        type="button"
      >
      </button>
      <Pagination list={list} currentPage={currentPage} handler={setPage} />
      <button
        onClick={() => nextPageHandler()}
        className="page_slider__next"
        disabled={showNextButton}
        type="button"
      >
      </button>
      <Button
        onClick={() => setPage(totalPages)}
        className="page_slider__end"
        disabled={showNextButton}
        type="button"
        variant='outlined'
      >
        to end
      </Button>
    </div>
  );
}

PageSlider.defaultProps = {
  hide: false,
};
