import React, { FunctionComponent } from 'react';
import { Tile } from './Tile'

type TileProps = {
  tile: Tile
}

type SquareProps = {
  playSpareTile: () => void
  isPlayable: boolean
}

type SpareProps = {
  rotateSpare: () => void
}

export const Square: FunctionComponent<TileProps & SquareProps> = ({tile, isPlayable, playSpareTile}) =>
<div className={isPlayable ? 'square square-btn' : 'square'}
  role="gridcell"
  tabIndex={0}>
  <div role={isPlayable ? 'button' : ''}
    className="squareButton"
    onClick={isPlayable ? playSpareTile : undefined}>
    {tile.value}
  </div>
</div>

export const Spare: FunctionComponent<TileProps & SpareProps> = ({tile, rotateSpare}) =>
<button className="spare" id="spare-tile" onClick={rotateSpare}>
  <div className="spare">
    {tile.value}
  </div>
</button>
