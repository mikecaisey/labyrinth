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
  const cells = getAllByRole(/cell/i)
  expect(cells).toHaveLength(7 * 7)
});

test('renders all 49 tiles', () => {
  const { getAllByRole } = render(<Board />)
  const cells = getAllByRole(/cell/i).map(x => new Number(x.textContent ?? 0))
  const sumOfCells = cells.reduce((a, x) => a = a + x, 0)
  const expected = [...Array(49).keys()].reduce((a,x) => a = a + x, 0)
  expect(sumOfCells).toEqual(expected)
})

test('renders tiles in random order', () => {
  render(<Board />)                           // Render board 1
  const { getAllByRole } = render(<Board />)  // Render board 2
  const tileSets = getAllByRole(/cell/i)
  const tileSet1 = tileSets.slice(0, 49).map(x => x.textContent)
  const tileSet2 = tileSets.slice(49).map(x => x.textContent)
  expect(tileSet1).not.toEqual(tileSet2)
})
