import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';
import { staticTiles, createTileSet ,TileSet } from './Tile'

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
  const tilesSet = getAllByRole(/cell/i).map(x => x.textContent)
  const staticSet = staticTiles().map(x => x.value)
  staticSet.forEach((x, i) => {
    if (x !== '') {
      expect(x).toEqual(tilesSet[i])
    }
  })
})

test('renders spare tile', () => {
  const { getByLabelText } = render(<Game />)
  const spare = getByLabelText(/Spare tile/i)
  expect(spare).not.toBeFalsy()
})
