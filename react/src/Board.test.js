import React from 'react';
import { render } from '@testing-library/react';
import Board from './Board';

test('renders 7 rows', () => {
  const { getAllByRole } = render(<Board />)
  const rows = getAllByRole(/row/i)
  expect(rows).toHaveLength(7)
});

test('renders 7 columns (times 7 rows)', () => {
  const { getAllByRole } = render(<Board />)
  const tiles = getAllByRole(/cell/i)
  expect(tiles).toHaveLength(7 * 7)
});

test('renders all 49 tiles', () => {
  const { getAllByRole } = render(<Board />)
  const tiles = getAllByRole(/cell/i).map(x => new Number(x.textContent ?? 0))
  const sumOfTiles = tiles.reduce((a, x) => a = a + x, 0)
  const expected = [...Array(49).keys()].reduce((a,x) => a = a + x, 0)
  expect(sumOfTiles).toEqual(expected)
})

test('renders tiles in random order', () => {
  render(<Board />)                           // Render board once
  const { getAllByRole } = render(<Board />)  // Render board twice
  const tileSets = getAllByRole(/cell/i)
  const tileSet1 = tileSets.slice(0, 49).map(x => x.textContent)
  const tileSet2 = tileSets.slice(49).map(x => x.textContent)
  expect(tileSet1).not.toEqual(tileSet2)
})
