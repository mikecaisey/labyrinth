import React, { FunctionComponent } from 'react';
import { Tile } from './Tile'

type SquareProps = {
  tile: Tile
}

type SpareProps = {
  rotateSpare: () => void
}

export const Square: FunctionComponent<SquareProps> = ({tile}) =>
  <div className="square"
    role="gridcell">
    {tile.value}
  </div>

export const Spare: FunctionComponent<SquareProps & SpareProps> = ({tile, rotateSpare}) =>
<button className="spare" id="spare-tile" onClick={rotateSpare}>
  <div className="square">
    {tile.value}
  </div>
</button>
