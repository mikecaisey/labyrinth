import React, { FunctionComponent } from 'react';
import { Tile } from './Tile'
import { Square } from './Square'
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element

type BoardProps = {
  board: Tile[]
}

type RowProps = {
  squares: Square[]
}

const Board: FunctionComponent<BoardProps> = ({board}) =>
    <div className="game-board" role="grid">
      <div>
        {layTilesOnBoard(board)}
      </div>
    </div>

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

const handleBoardClick = function() {
  console.log('INFO: Playable square click')
}

const layTilesOnBoard = (tiles: Tile[]): JSX.Element[] => {
  const rowCount: number = 7
  const colCount: number = 7
  const rows: Row[] = []

  // Outer loop to create the rows
  for (let i: number = 0; i < rowCount; i++) {
    const squares: Square[] = []

    //Inner loop to create squares
    for (let j: number = 0; j < colCount; j++) {
      const squareIndex: number = (i * 7 + j + 1)
      const squareValue: Tile = tiles[squareIndex - 1]

      squares.push(<Square
        key={squareIndex}
        tile={squareValue}
        isPlayable={playableSquares[squareIndex -1]}
        playSpareTile={handleBoardClick}
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
