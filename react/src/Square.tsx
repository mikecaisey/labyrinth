import React, { FunctionComponent } from 'react';
import { TileDto, Tile } from './Tile'

export type TileProps = {
  tile: TileDto
}

export type SquareProps = {
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
  <Tile tile={tile}
    isPlayable={isPlayable}
    playSpareTile={playSpareTile}
    key={tile.uid}/>
</div>

export const Spare: FunctionComponent<TileProps & SpareProps> = ({tile, rotateSpare}) =>
<button className="spare" id="spare-tile" onClick={rotateSpare}>
  <div className="spare">
    {tile.value}
  </div>
</button>
