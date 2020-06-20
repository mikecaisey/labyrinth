import React, { FunctionComponent } from 'react';
import { TileProps, SquareProps } from './Square'

export const Tile: FunctionComponent<TileProps & SquareProps> = ({tile, isPlayable, playSpareTile}) =>
<div role={isPlayable ? 'button' : ''}
  className="squareButton"
  onClick={isPlayable ? playSpareTile : undefined}>
  {tile.value}
</div>

export type TileDto = { value: string, uid: number }
export type TileSet = { board: TileDto[], spare: TileDto }

export const newTile: (value: string, uid: number) => TileDto
  = (value: string, uid: number) => ({ value, uid })

const ls: string[] = ['╚','╔','╗','╝']
const ts: string[] = ['╦','╣','╩','╠']
const is: string[] = ['║','═']

export const rotateTile = (before: TileDto): TileDto => {
  // if (typeof before === null) throw new Error('Rotate spare error 1')
  const fixtures: string[][] = [
    ['╚', '╔'], ['╔', '╗'], ['╗', '╝'], ['╝', '╚'],
    ['╦', '╣'], ['╣', '╩'], ['╩', '╠'], ['╠', '╦'],
    ['║', '═'], ['═', '║'],
  ]
  const rotated = fixtures.find(x => x[0] === before.value)
  if (typeof rotated === 'undefined') throw new Error('Rotated spare error')
  return { value:rotated[1], uid: before.uid }
}

const shuffleRotation = (set: string[]): string => {
  if (set.length === 0) { throw new Error('Shuffle rotate error') }
  const index: number = Math.floor(Math.random() * set.length)
  return set[index]
}

const shuffledLooseTiles: () => TileDto[]
  = () => {
    const t: string[] = new Array(6).fill('').map(() => shuffleRotation(ts))
    const l: string[] = new Array(15).fill('').map(() => shuffleRotation(ls))
    const i: string[] = new Array(13).fill('').map(() => shuffleRotation(is))
    let tiles: TileDto[] = t.concat(l).concat(i).map(x => newTile(x, -1))
    tiles.sort(() => Math.random() - 0.5)
    return tiles
  }

export const staticTiles: () => TileDto[] = () => [
  '╔','','╦','','╦','','╗',
  '', '','', '','', '','',
  '╠','','╠','','╦','','╣',
  '', '','', '','', '','',
  '╠','','╩','','╣','','╣',
  '', '','', '','', '','',
  '╚','','╩','','╩','','╝'
].map(x => newTile(x, -1))

export const createTileSet: () => TileSet = () => {
  const staticSet: TileDto[] = staticTiles()
  const looseSet: TileDto[] = shuffledLooseTiles()

  // suffle indexes
  const tiles: TileDto[] = new Array(49).fill('')
    .map((_, i) => newTile(`${i}`, i))
    .sort(() => Math.random() - 0.5)

  // replace static indexes with corresponding static tiles
  for (let i=0; i<tiles.length; i++) {
    if (staticSet[i].value !== '') {
      tiles[i] = staticSet[i]
      tiles[i].uid = i
    }
  }

  // replace remaining indexes with loose tiles
  const shuffledSet = looseSet.slice()
  tiles.forEach((x, i) => {
    const isEmptySquare: boolean = !Number.isNaN(Number(x.value))
    if (isEmptySquare) {
      let tile: TileDto | undefined = shuffledSet.pop()
      if (typeof tile !== 'undefined') {
        tiles[i] = tile
        tiles[i].uid = i
      } else {
        throw new Error('TileDto error')
      }
    }
  })

  const spare: TileDto | undefined = shuffledSet.pop()
  if (typeof spare === 'undefined') { throw new Error('Spare tile error') }
  spare.uid = 49
  return { board: tiles, spare }
}

export const moveTiles = function(tileSet: TileSet, squareIndex: number): TileSet {
  let newTileSet: TileSet = { board: [], spare: newTile('x', -1) }
  if ([1,3,5].indexOf(squareIndex) >= 0) newTileSet = moveTilesDown(tileSet, squareIndex)
  if ([43,45,47].indexOf(squareIndex) >= 0) newTileSet = moveTilesUp(tileSet, squareIndex)
  if ([13,27,41].indexOf(squareIndex) >= 0) newTileSet = moveTilesLeft(tileSet, squareIndex)
  if ([7,21,35].indexOf(squareIndex) >= 0) newTileSet = moveTilesRight(tileSet, squareIndex)
  return newTileSet
}

const moveTilesLeft = function(tileSet: TileSet, squareIndex: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // left
  const row = squareIndex - 7
  for (let n=1; n<7; n++) newSet[n+row] = oldSet[n+row+1]
  newSet[squareIndex] = oldSpare
  newSpare = oldSet[squareIndex - 6]

  return { board: newSet, spare: newSpare }
}

const moveTilesRight = function(tileSet: TileSet, squareIndex: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // right
  const row = squareIndex
  for (let n=1; n<=6; n++) newSet[n+row] = oldSet[n+row-1]
  newSet[row] = oldSpare
  newSpare = oldSet[row+6]

  return { board: newSet, spare: newSpare }
}

const moveTilesUp = function(tileSet: TileSet, squareIndex: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // up
  const column = squareIndex % 7
  new Array(49).fill(0).forEach((_, n) => {
    if (n%7 === column) newSet[n] = newSet[n+7] ?? oldSpare
  })
  newSpare = oldSet[column]

  return { board: newSet, spare: newSpare }
}

const moveTilesDown = function(tileSet: TileSet, squareIndex: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // down
  const column = squareIndex
  new Array(49).fill(0).forEach((_, n) => {
    if (n%7 === column) newSet[n] = oldSet[n-7] ?? oldSpare
  })
  newSpare = oldSet[42+column]


  return { board: newSet, spare: newSpare }
}
