import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { winnersSlice } from '../../store/reducers/winnersReducer';

type Props = {
  winnerInfo: {
    id?: string | undefined;
    name?: string | undefined;
  } | false
}

export default function ShowWinner(props: Props) {
  const { winnerInfo } = props;

  const dispatch = useAppDispatch();
  const { setCurrentWinner } = winnersSlice.actions;
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      dispatch(setCurrentWinner(false));
    }, 6000);
  }, []);

  return (

    <div className="winner_show-container ">
      {winnerInfo && (
        <div className="animate__heartBeat">
          The Winner is
          {' '}
          <span className="winner_name">{winnerInfo.name}</span>
        </div>
      )}

    </div>

  );
}
