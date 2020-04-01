import React from 'react';
import './Board.css'

class Board extends React.Component {

  createSquares() {
    const rowCount = 7
    const colCount = 7
    const table = []

    for (let i = 0; i < rowCount; i++) {
      const children = []

      //Inner loop to create children
      for (let j = 0; j < colCount; j++) {
        children.push(<div
          className="square"
          role="cell"
          key={`board-square-${i * 7 + j + 1}`}>
          </div>)
      }

      //Create the parent and add the children
      table.push(<div
        className="board-row"
        role="row"
        key={`board-row-${i + 1}`}>
        {children}
        </div>)
    }
    return table
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div>
            {this.createSquares()}
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
