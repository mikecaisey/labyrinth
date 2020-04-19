import React, { FunctionComponent } from 'react';
import { Tile } from './Tile'
import { Square } from './Square'

type Row = JSX.Element
type Square = JSX.Element

type BoardProps = {
  board: Tile[],
  playSpareTile: (i: number) => void
}

type RowProps = {
  squares: Square[]
}

const Board: FunctionComponent<BoardProps> = ({board, playSpareTile}) =>
    <div className="game-board" role="grid">
      <div>
        {layTilesOnBoard(board, playSpareTile)}
      </div>
    </div>

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

const layTilesOnBoard = (tiles: Tile[], playSpareTile: (i: number) => void): JSX.Element[] => {
  const rowCount: number = 7
  const colCount: number = 7
  const rows: Row[] = []

  // Outer loop to create the rows
  for (let i: number = 0; i < rowCount; i++) {
    const squares: Square[] = []

    //Inner loop to create squares
    for (let j: number = 0; j < colCount; j++) {
      const squareIndex: number = (i * 7 + j)
      const squareNumber: number = squareIndex + 1
      const squareValue: Tile = tiles[squareIndex]

      squares.push(<Square
        key={squareNumber}
        tile={squareValue}
        isPlayable={playableSquares[squareIndex]}
        playSpareTile={() => playSpareTile(squareIndex)}
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

// export default Board
export default Board
