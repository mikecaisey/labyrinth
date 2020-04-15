import React, { FunctionComponent } from 'react';
import { Tile, TileSet } from './Tile'
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element
type Spare = Tile
type BoardProps = TileSet

type SquareProps = {
  tile: Tile
}

type RowProps = {
  squares: Square[]
}

const layTilesOnBoard = (tiles: Tile[]) => {
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

const laySpare = (spare: Tile) => {
  return <Spare
    key={50}
    tile={spare}
  />
}

const Board: FunctionComponent<BoardProps> = ({board, spare}) =>
  <div className="game">
    <div className="game-board" role="grid">
      <div>
        {layTilesOnBoard(board)}
      </div>
    </div>
    <div className="game-info">
      <div aria-labelledby="spare-label">{laySpare(spare)}</div>
      <span id="spare-label">
        Spare tile
      </span>
    </div>
  </div>

const Square: FunctionComponent<SquareProps> = ({tile}) =>
  <div className="square"
    role="gridcell">
    {tile.value}
  </div>

const Spare: FunctionComponent<SquareProps> = ({tile}) =>
  <button className="spare" id="spare-tile">
    <div className="square">
      {tile.value}
    </div>
  </button>

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

// export default Board
export default Board
