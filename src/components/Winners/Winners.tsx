import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { apiSlice } from '../../store/reducers/apiReducer';
import { pagesSlice } from '../../store/reducers/pagesReducer';
import PageSlider from '../PageSlider/PageSlider';
import WinnersTable from './WinnersTable';

export default function Winners() {
  const dispatch = useAppDispatch();
  const { totalWinnerPages, winnerPage } = useAppSelector(
    (state) => state.pages,
  );
  const {
    winners,
    configs: { sort, limit, order },
    totalCount
  } = useAppSelector((state) => state.winners);

  const { prevWinnersPage, nextWinnersPage, setWinnersPage } = pagesSlice.actions;
  const { getAllWinners } = apiSlice.actions;

  useEffect(() => {
    dispatch(getAllWinners({
      page: winnerPage, sort, limit, order,
    }));
  }, [winnerPage]);

  return (
    <div>
      <div className='winners_total'>Total winners: {totalCount}</div>
      <WinnersTable winners={winners} page={winnerPage} sort={sort} order={order} />
      <PageSlider
        totalPages={totalWinnerPages}
        currentPage={winnerPage}
        nextPageHandler={nextWinnersPage}
        prevPageHandler={prevWinnersPage}
        setPage={setWinnersPage}
      />
    </div>
  );
}
