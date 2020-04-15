export type Tile = { value: string }
export type TileSet = { board: Tile[], spare: Tile }

export const newTile: (value: string) => Tile = (value: string) => {
  return { value }
}

const ls: string[] = ['╚','╔','╗','╝']
const ts: string[] = ['╦','╣','╩','╠']
const is: string[] = ['║','═']

export const rotateTile = (before: Tile): Tile => {
  // if (typeof before === null) throw new Error('Rotate spare error 1')
  const fixtures: string[][] = [
    ['╚', '╔'], ['╔', '╗'], ['╗', '╝'], ['╝', '╚'],
    ['╦', '╣'], ['╣', '╩'], ['╩', '╠'], ['╠', '╦'],
    ['║', '═'], ['═', '║'],
  ]
  const rotated = fixtures.find(x => x[0] === before.value)
  if (typeof rotated === 'undefined') throw new Error('Rotated spare error')
  return { value:rotated[1] }
}

const shuffleRotation = (set: string[]): string => {
  if (set.length === 0) { throw new Error('Shuffle rotate error') }
  const index: number = Math.floor(Math.random() * set.length)
  return set[index]
}

const shuffledLooseTiles: () => Tile[] = () => {
  const t: string[] = new Array(6).fill('').map(() => shuffleRotation(ts))
  const l: string[] = new Array(15).fill('').map(() => shuffleRotation(ls))
  const i: string[] = new Array(13).fill('').map(() => shuffleRotation(is))
  let tiles: Tile[] = t.concat(l).concat(i).map(x => newTile(x))
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
].map(x => newTile(x))

export const createTileSet: () => TileSet = () => {
  const staticSet: Tile[] = staticTiles()
  const looseSet: Tile[] = shuffledLooseTiles()

  // initialize the tile set
  const tiles: Tile[] = new Array(49).fill('')
    .map((_, i) => newTile(`${i}`))
    .sort(() => Math.random() - 0.5)

  // place the static tiles
  tiles.forEach((_, i) => {
    tiles[i] = (staticSet[i].value === '' ? tiles[i] : staticSet[i])
  })

  // place the loose tiles
  const shuffledSet = looseSet.slice()
  tiles.forEach((x, i) => {
    const isEmptySquare: boolean = !Number.isNaN(Number(x.value))
    if (isEmptySquare) {
      let tile: Tile | undefined = shuffledSet.pop()
      if (typeof tile !== 'undefined') {
        tiles[i] = tile
      } else {
        throw new Error('Tile error')
      }
    }
  })

  const spare: Tile | undefined = shuffledSet.pop()
  if (typeof spare === 'undefined') { throw new Error('Spare tile error') }
  return { board: tiles, spare }
}
