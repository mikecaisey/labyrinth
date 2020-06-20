import React, { FunctionComponent } from 'react';
import { TileDto, Tile } from './Tile'

export type TileProps = {
  tile: TileDto
}

export type SquareProps = {
  isPlayable: boolean
}

export const Square: FunctionComponent<TileProps & SquareProps> = ({tile, isPlayable}) =>
<div className={isPlayable ? 'square square-btn' : 'square'}
  role="gridcell"
  tabIndex={0}>
  <Tile tile={tile}
    isPlayable={isPlayable}
    key={tile.uid}/>
</div>
