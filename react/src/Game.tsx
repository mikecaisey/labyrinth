import React from 'react';
import { createTileSet, TileSet } from './Tile'
import Board from './Board'

class Game extends React.Component<any, TileSet> {
  constructor(props: any) { // Remove ?
    super(props)
    this.state = createTileSet()
  }

  render() {
    return (
      <Board
        board={this.state.board}
        spare={this.state.spare}
      />
    )
  }
}

export default Game
