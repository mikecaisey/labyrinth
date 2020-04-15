import React, { FunctionComponent } from 'react';
import { Tile } from './Tile'

export type SquareProps = {
  tile: Tile
}

export const Square: FunctionComponent<SquareProps> = ({tile}) =>
  <div className="square"
    role="gridcell">
    {tile.value}
  </div>

export const Spare: FunctionComponent<SquareProps> = ({tile}) =>
<button className="spare" id="spare-tile">
  <div className="square">
    {tile.value}
  </div>
</button>
