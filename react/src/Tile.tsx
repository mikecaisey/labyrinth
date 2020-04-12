export type Tile = {
  value: string
}

export const looseTiles: () => Tile[] = () => {
  const t: string[] = new Array(6).fill('╩')
  const l: string[] = new Array(15).fill('╚')
  const i: string[] = new Array(13).fill('║')
  let tiles: Tile[] = t.concat(l).concat(i).map(x => ({ value: x }))
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
