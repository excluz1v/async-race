import { Button } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import ShowWinner from '../Race/ShowWinner';

const list = (path: string, text: string) => {
  const location = useLocation();
  const url = location.pathname;
  let className: 'outlined' | 'contained' = 'outlined';
  if (url === path) className = 'contained';
  const { isRace } = useAppSelector((state) => state.pages);

  return (
    <li className="nav_list__item">
      <Link to={path}>
        <Button disabled={isRace} className="nav_list__button" variant={className}>{text}</Button>
      </Link>
    </li>
  );
};

export default function Header() {
  const { currentWinner } = useAppSelector((state) => state.winners);
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav_list">
          {list('/', 'Garage')}
          {list('/winners', 'Winners')}
        </ul>
      </nav>
      {currentWinner && <ShowWinner winnerInfo={currentWinner} /> }
    </header>
  );
}
