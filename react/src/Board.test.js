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
  const tileCount = getAllByRole(/cell/i).length
  expect(tileCount).toEqual(49)
})

test('renders tiles in random order', () => {
  render(<Board />)                           // Render board once
  const { getAllByRole } = render(<Board />)  // Render board twice
  const tileSets = getAllByRole(/cell/i)
  const tileSet1 = tileSets.slice(0, 49).map(x => x.textContent)
  const tileSet2 = tileSets.slice(49).map(x => x.textContent)
  expect(tileSet1).not.toEqual(tileSet2)
})

test('The top left tile (0,6) is a corner piece ╔', () => {
  const { getAllByRole } = render(<Board />)
  const tile = getAllByRole(/cell/i)[0].textContent
  expect(tile).toEqual('╔')
})
