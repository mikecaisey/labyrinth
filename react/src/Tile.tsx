export type Tile = {
  value: string
}

const ls: string[] = ['╚','╝','╗','╔']
const ts: string[] = ['╦','╣','╠','╩']
const is: string[] = ['║','═']

const shuffleRotate = (set: string[]): string => {
  if (set.length === 0) { throw 'Shuffle rotate error' }
  const index: number = Math.floor(Math.random() * set.length)
  return set[index]
}

export const shuffledLooseTiles: () => Tile[] = () => {
  const t: string[] = new Array(6).fill('╩').map(x => shuffleRotate(ts))
  const l: string[] = new Array(15).fill('╚').map(x => shuffleRotate(ls))
  const i: string[] = new Array(13).fill('║').map(x => shuffleRotate(is))
  let tiles: Tile[] = t.concat(l).concat(i).map(x => ({ value: x }))
  tiles.sort(() => Math.random() - 0.5)
  return tiles
}

export const staticTiles: () => Tile[] = () => [
  '╔','','╦','','╦','','╗',
  '', '','', '','', '','',
  '╠','','╠','','╦','','╣',
  '', '','', '','', '','',
  '╠','','╩','','╣','','╣',
  '', '','', '','', '','',
  '╚','','╩','','╩','','╝'
].map(x => { return { value: x} })
