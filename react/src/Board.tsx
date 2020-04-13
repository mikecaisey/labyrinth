import React, { FunctionComponent } from 'react';
import { newTile, shuffledLooseTiles, staticTiles, Tile } from './Tile'
import './Board.css'

type Row = JSX.Element
type Square = JSX.Element

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

class Board extends React.Component {

  createTileSet(): Tile[] {
    const staticSet: Tile[] = staticTiles()
    const looseSet: Tile[] = shuffledLooseTiles()

    // initialize the tile set
    const tiles: Tile[] = new Array(49).fill('')
      .map((_, i) => newTile(`${i}`))
      .sort(() => Math.random() - 0.5)

    // place the static tiles
    tiles.forEach((_, i) => {
      tiles[i] = (staticSet[i].value === '' ? tiles[i] : staticSet[i])
    })

    // place the loose tiles
    const shuffledSet = looseSet.slice()
    tiles.forEach((x, i) => {
      const isEmptySquare: boolean = !Number.isNaN(Number(x.value))
      if (isEmptySquare) {
        let tile: Tile | undefined = shuffledSet.pop()
        if (typeof tile !== 'undefined') {
          tiles[i] = tile
        } else {
          throw 'Tile error'
        }
      }
    })

    return tiles
  }

  renderBoard() {
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
