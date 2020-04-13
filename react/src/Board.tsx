import React, { FunctionComponent } from 'react';
import { createTileSet, Tile } from './Tile'
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element

type SquareProps = {
  tile: Tile
}

type RowProps = {
  squares: Square[]
}

const Square: FunctionComponent<SquareProps> = ({tile}) =>
  <div className="square"
    role="gridcell">
    {tile.value}
  </div>

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

class Board extends React.Component {
  renderBoard() {
    const rowCount: number = 7
    const colCount: number = 7
    const rows: Row[] = []
    const allTiles: [Tile[], Tile] = createTileSet()
    const tiles = allTiles[0]
    const spare = allTiles[1]

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

  render() {
    return (
      <div className="game">
        <div className="game-board" role="grid">
          <div>
            {this.renderBoard()}
          </div>
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    )
  }
}

export default Board
