import React from 'react';
import { Spare } from './Square'
import { createTileSet, rotateTile, TileSet } from './Tile'
import Board from './Board'

class Game extends React.Component<any, TileSet> {
  constructor(props: any) { // Remove ?
    super(props)
    this.state = createTileSet()
  }

  handleSpareClick() {
    this.setState({
      board: this.state.board,
      spare: rotateTile(this.state.spare)
    })
  }

  render() {
    return (
      <div className="game">
        <Board
          board={this.state.board}
        />
        <div className="game-info">
          <div aria-labelledby="spare-label">
            <Spare
              key={50}
              tile={this.state.spare}
              rotateSpare={() => {this.handleSpareClick()}}
            />
          </div>
          <span id="spare-label">
            Spare tile
          </span>
        </div>
      </div>
    )
  }
}

export default Game
