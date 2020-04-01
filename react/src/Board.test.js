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
