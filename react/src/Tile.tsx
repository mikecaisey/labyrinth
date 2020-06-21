import React, { FunctionComponent } from 'react';

export type TileProps = {
  tile: TileDto,
  isPlayable: boolean
}

export const Tile: FunctionComponent<TileProps> = ({tile, isPlayable}) =>
<div role={isPlayable ? 'button' : ''}
  className="squareButton">
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
    let tiles: TileDto[] = [...i, ...t, ...l].map((x, i) => newTile(x, i))
    return tiles.slice().sort(() => Math.random() - 0.5)
  }

export const staticTiles: () => TileDto[] = () => [
  '╔','','╦','','╦','','╗',
  '', '','', '','', '','',
  '╠','','╠','','╦','','╣',
  '', '','', '','', '','',
  '╠','','╩','','╣','','╣',
  '', '','', '','', '','',
  '╚','','╩','','╩','','╝'
].map((x, i) => newTile(x, i))

export const createTileSet: () => TileSet = () => {
  const staticSet: TileDto[] = staticTiles()
  const looseSet: TileDto[] = shuffledLooseTiles()

  // create tiles
  const tiles: TileDto[] = new Array(49).fill('')
    .map((_, i) => newTile(`${i}`, i))
    .sort(() => Math.random() - 0.5)

  // replace static indexes with corresponding static tiles
  for (let i=0; i<tiles.length; i++) {
    if (staticSet[i].value !== '') {
      tiles[i] = staticSet[i]
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
      } else {
        throw new Error('TileDto error')
      }
    }
  })

  const spare: TileDto | undefined = shuffledSet.pop()
  if (typeof spare === 'undefined') { throw new Error('Spare tile error') }
  return { board: tiles, spare }
}

export const moveTiles = function(tileSet: TileSet, squareUid: number): TileSet {
  let newTileSet: TileSet = { board: [], spare: newTile('x', -1) }
  if ([1,3,5].indexOf(squareUid) >= 0) newTileSet = moveTilesDown(tileSet, squareUid)
  else if ([43,45,47].indexOf(squareUid) >= 0) newTileSet = moveTilesUp(tileSet, squareUid)
  else if ([13,27,41].indexOf(squareUid) >= 0) newTileSet = moveTilesLeft(tileSet, squareUid)
  else if ([7,21,35].indexOf(squareUid) >= 0) newTileSet = moveTilesRight(tileSet, squareUid)
  else {
    newTileSet.board = tileSet.board.slice()
    newTileSet.spare = tileSet.spare
  }
  return newTileSet
}

const moveTilesLeft = function(tileSet: TileSet, squareUid: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // left
  const row = squareUid - 7
  for (let n=1; n<7; n++) newSet[n+row] = oldSet[n+row+1]
  newSet[squareUid] = oldSpare
  newSpare = oldSet[squareUid - 6]

  return { board: newSet, spare: newSpare }
}

const moveTilesRight = function(tileSet: TileSet, squareUid: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // right
  const row = squareUid
  for (let n=1; n<=6; n++) newSet[n+row] = oldSet[n+row-1]
  newSet[row] = oldSpare
  newSpare = oldSet[row+6]

  return { board: newSet, spare: newSpare }
}

const moveTilesUp = function(tileSet: TileSet, squareUid: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // up
  const column = squareUid % 7
  new Array(49).fill(0).forEach((_, n) => {
    if (n%7 === column) newSet[n] = newSet[n+7] ?? oldSpare
  })
  newSpare = oldSet[column]

  return { board: newSet, spare: newSpare }
}

const moveTilesDown = function(tileSet: TileSet, squareUid: number): TileSet {
  const oldSet = tileSet.board
  const newSet = tileSet.board.slice()
  const oldSpare = tileSet.spare
  let newSpare = tileSet.spare

  // down
  const column = squareUid
  new Array(49).fill(0).forEach((_, n) => {
    if (n%7 === column) newSet[n] = oldSet[n-7] ?? oldSpare
  })
  newSpare = oldSet[42+column]


  return { board: newSet, spare: newSpare }
}
