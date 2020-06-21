import { createTileSet, moveTiles, rotateTile, TileSet } from '../Tile'
import { rotateSpare, playSpare, PlayerActions } from '../actions'

type RotateAction =  ReturnType<typeof rotateSpare>
type PlaySpareAction = ReturnType<typeof playSpare>
type GameAction = RotateAction | PlaySpareAction

const initialState: TileSet = createTileSet()

export const gameReducer = (
  state: TileSet = initialState,
  action: GameAction
): TileSet => {
  
  switch (action.type) {
    case PlayerActions.ROTATE_SPARE:
      return { board:state.board, spare:rotateTile(state.spare) }

    case PlayerActions.PLAY_SPARE:
      const squareUid = (action as PlaySpareAction).value
      return moveTiles(state, squareUid)

    default:
      return state;
  }
}

export type RootState = ReturnType<typeof gameReducer>
