import React, { FunctionComponent } from 'react';
import { createTileSet, Tile, TileSet } from './Tile'
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

class Board extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = createTileSet()
  }

  renderBoard(): JSX.Element[] {
    const rowCount: number = 7
    const colCount: number = 7
    const rows: Row[] = []
    const tileSet: TileSet = this.state as TileSet
    const tiles: Tile[] = tileSet.board

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

  renderSpare(): JSX.Element {
    const tileSet = this.state as TileSet
    const spare: Tile = tileSet.spare
    return <Spare
      key={50}
      tile={spare}
    />
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
          <div aria-labelledby="spare-label">{this.renderSpare()}</div>
          <span id="spare-label">
            Spare tile
          </span>
        </div>
      </div>
    )
  }
}

export default Board
