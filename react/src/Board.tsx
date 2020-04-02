import React, { FunctionComponent } from 'react';
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element

type Tile = {
  value: number
}

type SquareProps = {
  squareValue: number
}

type RowProps = {
  squares: JSX.Element[]
}

const Square: FunctionComponent<SquareProps> = ({squareValue}) =>
  <div className="square"
    role="gridcell">
    {squareValue}
  </div>

const Row: FunctionComponent<RowProps> = ({squares}) =>
  <div
    className="board-row"
    role="row">
    {squares}
  </div>

class Board extends React.Component {

  createTileSet(): Tile[] {
    const tiles: Tile[] = new Array(49)
      .fill(1)
      .map((_, i) => {
        return { value: i }
      })
      .sort(() => Math.random() - 0.5)
    return tiles
  }

  createBoard() {
    const rowCount: number = 7
    const colCount: number = 7
    const rows: Row[] = []
    const tiles: Tile[] = this.createTileSet()

    // Outer loop to create the rows
    for (let i = 0; i < rowCount; i++) {
      const squares: Square[] = []

      //Inner loop to create squares
      for (let j = 0; j < colCount; j++) {
        const squareIndex: number = (i * 7 + j + 1)
        const squareValue: number = tiles[squareIndex - 1].value
        squares.push(<Square
          key={squareIndex}
          squareValue={squareValue}
        />)
      }

      //Create the parent and add the squares
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
            {this.createBoard()}
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
