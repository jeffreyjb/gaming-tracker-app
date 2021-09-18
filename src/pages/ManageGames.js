import { Fragment, useContext } from 'react';

import Button from '../components/UI/Button';
import GameManager from '../components/GameManager/GameManager';

import GamesContext from '../store/games-context';

const ManageGames = () => {
  const gmsCtx = useContext(GamesContext);

  return (
    <Fragment>
      {!gmsCtx.gamesLoaded && <Button onClick={gmsCtx.fetchGames}>Edit Games</Button>}
      {gmsCtx.gamesLoaded && <GameManager/>}
    </Fragment>
  );
};

export default ManageGames;