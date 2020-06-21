import React, { FunctionComponent } from 'react';
import { TileDto, Tile, TileProps } from './Tile'
import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { PlayerActions } from './actions'

type Row = JSX.Element
type Square = JSX.Element

type BoardProps = {
  board: TileDto[]
}

const Board: FunctionComponent<BoardProps> = ({board}) =>
<div className="game-board" role="grid">
  <div>
    {layTilesOnBoard(board)}
  </div>
</div>

type RowProps = {
  squares: Square[]
}

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  playSpare: (key: number) => {
    dispatch({ type: PlayerActions.PLAY_SPARE, value: key })
  }
})

export type SquareProps = {
  isPlayable: boolean,
  uid: number
} & TileProps
  & ReturnType<typeof mapDispatchToProps>

const _Square: FunctionComponent<SquareProps> = ({tile, isPlayable, playSpare, uid}) =>
<div className={isPlayable ? 'square square-btn' : 'square'}
  role="gridcell"
  tabIndex={0}
  onClick={() => playSpare(uid)}>
  <Tile tile={tile}
    isPlayable={isPlayable}
    key={tile.uid}/>
</div>

const Square = connect(null, mapDispatchToProps)(_Square)

const layTilesOnBoard = (tiles: TileDto[]): JSX.Element[] => {
  const rowCount: number = 7
  const colCount: number = 7
  const rows: Row[] = []

  // Outer loop to create the rows
  for (let i: number = 0; i < rowCount; i++) {
    const squares: Square[] = []

    //Inner loop to create squares
    for (let j: number = 0; j < colCount; j++) {
      const squareUid: number = (i * 7 + j)
      const tile: TileDto = tiles[squareUid]

      squares.push(<Square
        key={squareUid}
        uid={squareUid}
        tile={tile}
        isPlayable={playableSquares[squareUid]}
      />)
    }

    //Create the row and add the squares
    rows.push(<Row
      squares={squares}
      key={i + 1}
    />)
  }
  return rows
}

const playableSquares = [
  false, true,  false, true,  false, true,  false,
  true,  false, false, false, false, false, true,
  false, false, false, false, false, false, false,
  true,  false, false, false, false, false, true,
  false, false, false, false, false, false, false,
  true,  false, false, false, false, false, true,
  false, true,  false, true,  false, true,  false
]

export default Board
