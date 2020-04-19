import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';
import { staticTiles } from './Tile'

test('renders 7 rows', () => {
  const { getAllByRole } = render(<Game />)
  const rows = getAllByRole(/row/i)
  expect(rows).toHaveLength(7)
});

test('renders 7 columns (times 7 rows)', () => {
  const { getAllByRole } = render(<Game />)
  const tiles = getAllByRole(/cell/i)
  expect(tiles).toHaveLength(7 * 7)
});

test('renders all 49 tiles', () => {
  const { getAllByRole } = render(<Game />)
  const tileCount = getAllByRole(/cell/i).length
  expect(tileCount).toEqual(49)
})

test('renders tiles in random order', () => {
  render(<Game />)                           // Render board once
  const { getAllByRole } = render(<Game />)  // Render board twice
  const tileSets = getAllByRole(/cell/i)
  const tileSet1 = tileSets.slice(0, 49).map(x => x.textContent)
  const tileSet2 = tileSets.slice(49).map(x => x.textContent)
  expect(tileSet1).not.toEqual(tileSet2)
})

test('static tiles are in expected squares', () => {
  const { getAllByRole } = render(<Game />)
  const tileSet = getAllByRole(/cell/i).map(x => x.textContent)
  const staticSet = staticTiles().map(x => x.value)
  staticSet.forEach((x, i) => {
    if (x !== '') {
      expect(x).toEqual(tileSet[i])
    }
  })
})

test('renders spare tile', () => {
  const { getByLabelText } = render(<Game />)
  const spare = getByLabelText(/Spare tile/i)
  expect(spare).not.toBeFalsy()
})

test('board edge tiles are aria clickable', () => {
  const { getAllByRole } = render(<Game />)
  const btnSet = getAllByRole(/button/i)
    .filter(x => x.className === 'squareButton')
  expect(btnSet.length).toEqual(12)
})

// render board to console helper
const consoleRender = (a: (string|null)[], s: string) => {
  let o = ''
  for (let i=0; i<8; i++) {
    o += a.slice(i*7,i*7+7).map(x => `${x}`.padEnd(2,' ')).toString() + "\n"
  }
  console.log(o,s)
}

// simple move tileSet
const moveTiles = (tileSet: (string|null)[], spare: string) => {
  const column3IdxSet = [ 5, 12, 19, 26, 33, 40, 47 ]

  const column = [spare]
  column3IdxSet.forEach(x => column.push(tileSet[x]))
  const newSpare = column.pop() ?? 'X'
  return [column, newSpare]
}
