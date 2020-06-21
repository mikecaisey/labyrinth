import { TileDto } from '../Tile'

export const rotateSpare = (tile: TileDto) => ({
  type: 'ROTATE_SPARE',
  tile
})

export const playSpare = (squareUid: number) => ({
  type: 'PLAY_SPARE',
  value: squareUid
})

export const PlayerActions = {
  ROTATE_SPARE: 'ROTATE_SPARE',
  PLAY_SPARE: 'PLAY_SPARE',
}
