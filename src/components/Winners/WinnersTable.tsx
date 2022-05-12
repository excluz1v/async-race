import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { apiSlice } from '../../store/reducers/apiReducer';
import { winnerConfig, winnersType } from '../../store/types';
import SortAscIcon from '../SortIcons/SortAscIcon';
import SortDescIcon from '../SortIcons/SortDescIcon';

type Props = {
  winners: winnersType[];
  page: number;
  sort: string;
  order: string
};

export default function WinnersTable(props: Props) {
  const { winners, page, sort, order } = props;

  const dispatch = useAppDispatch();

  const { getAllWinners } = apiSlice.actions;

  function sortTable(
    order: 'ASC' | 'DESC',
    sort: 'time' | 'wins' | 'id',
    limit = 10,
  ) {
    const configs: winnerConfig = {
      order,
      sort,
      limit,
    };
    dispatch(getAllWinners({ ...configs, page }));
  }

  return (
    <table className="winners_table">
      <thead>
        <tr>
          <th>
            <span>Id</span>
            <button className='sort_id-asc' type="button" onClick={() => sortTable('ASC', 'id')}><SortAscIcon isActive={sort === 'id' && order === 'ASC'} /></button>
            <button className='sort_id-desc' type="button" onClick={() => sortTable('DESC', 'id')}><SortDescIcon isActive={sort === 'id' && order === 'DESC'} /></button>
          </th>
          <th>Car`s Model</th>
          <th>
            <span>Wins</span>
            <button className='sort_wins-asc' type="button" onClick={() => sortTable('ASC', 'wins')}><SortAscIcon isActive={sort === 'wins' && order === 'ASC'} /></button>
            <button className='sort_wins-desc' type="button" onClick={() => sortTable('DESC', 'wins')}><SortDescIcon isActive={sort === 'wins' && order === 'DESC'} /></button>
          </th>
          <th>
            <span>Best Time</span>
            <button className='sort_time-asc' type="button" onClick={() => sortTable('ASC', 'time')}><SortAscIcon isActive={sort === 'time' && order === 'ASC'} /></button>
            <button className='sort_time-desc' type="button" onClick={() => sortTable('DESC', 'time')}><SortDescIcon isActive={sort === 'time' && order === 'DESC'} /></button>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={index}>
            <td>{winner.id}</td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
