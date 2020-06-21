import { createTileSet, rotateTile, TileSet } from '../Tile'
import { rotateSpare, playSpare, PlayerActions } from '../actions'

type GameAction = ReturnType<typeof rotateSpare | typeof playSpare>
type GameState = TileSet

const initialState: GameState = createTileSet()

export const gameReducer = (
  state: GameState = initialState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case PlayerActions.ROTATE_SPARE:
      return { board:state.board, spare:rotateTile(state.spare) }
    default:
      return state;
  }
}

export type RootState = ReturnType<typeof gameReducer>
