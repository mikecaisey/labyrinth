export type Tile = {
  value: string
}

export const newTile: (value: string) => Tile = (value: string) => {
  return { value }
}

const ls: string[] = ['╚','╝','╗','╔']
const ts: string[] = ['╦','╣','╠','╩']
const is: string[] = ['║','═']

const shuffleRotation = (set: string[]): string => {
  if (set.length === 0) { throw 'Shuffle rotate error' }
  const index: number = Math.floor(Math.random() * set.length)
  return set[index]
}

const shuffledLooseTiles: () => Tile[] = () => {
  const t: string[] = new Array(6).fill('╩').map(x => shuffleRotation(ts))
  const l: string[] = new Array(15).fill('╚').map(x => shuffleRotation(ls))
  const i: string[] = new Array(13).fill('║').map(x => shuffleRotation(is))
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

export const createTileSet: () => [Tile[], Tile] = () => {
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
        throw 'Tile error'
      }
    }
  })

  const spareTile: Tile | undefined = shuffledSet.pop()
  if (typeof spareTile === 'undefined') { throw 'Spare tile error' }
  return [tiles, spareTile]
}
