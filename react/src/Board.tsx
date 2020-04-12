import React, { FunctionComponent } from 'react';
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element

type Tile = {
  value: string
}

type SquareProps = {
  tile: Tile
}

type RowProps = {
  squares: JSX.Element[]
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

const staticTiles: Tile[] = [
  '╔','','╦','','╦','','╗',
  '', '','', '','', '','',
  '╠','','╠','','╦','','╣',
  '', '','', '','', '','',
  '╠','','╩','','╣','','╣',
  '', '','', '','', '','',
  '╚','','╩','','╩','','╝'
].map(x => { return { value: x} })

class Board extends React.Component {

  createTileSet(): Tile[] {
    const tiles: Tile[] = new Array(49).fill('')
      .map((_, i) => { return { value: `${i}`} })
      .sort(() => Math.random() - 0.5)

    tiles.forEach((x, i) => {
      tiles[i] = (staticTiles[i].value === '' ? tiles[i] : staticTiles[i])
    })

    return tiles
  }

  createBoard() { // rename to populate board with tile set
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
