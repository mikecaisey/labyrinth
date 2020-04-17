import React from 'react';
import { render } from '@testing-library/react';
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
  const tileSet = getAllByRole(/button/i)
    .filter(x => x.className === 'squareButton')
  expect(tileSet.length).toEqual(12)
})

const myArray = new Array(49).fill(0).map((_, i) => i)
const mySpare = 49

test('insert tile', () => {
  // take array and clone
  const newArray = myArray.slice()
  let newSpare = 49

  // shift row or columns
  const r = 14
  for (let i=1; i<=6; i++) newArray[i+r] = myArray[i+r-1]
  newArray[r] = mySpare
  newSpare = r+6

  // return new array
  ;((a, s) => {
    let o = ''
    for (let i=0; i<8; i++) {
      o += a.slice(i*7,i*7+7).map(x => `${x}`.padEnd(2,' ')).toString() + "\n"
    }
    console.log(o,s)
  })(newArray, newSpare)
})

const up = function(myArray: number[], mySpare: number) {
  const newArray = myArray.slice()
  let newSpare = 49

  myArray.forEach(n => {
    if (n%7 === 5) newArray[n] = myArray[n+7] ?? mySpare
  })
  newSpare = 5

  return [newArray, newSpare]
}

const down = function(myArray: number[], mySpare: number) {
  const newArray = myArray.slice()
  let newSpare = 49

  myArray.forEach(n => {
    if (n%7 === 5) newArray[n] = myArray[n-7] ?? mySpare
  })
  newSpare = 47

  return [newArray, newSpare]
}

const left = function(myArray: number[], mySpare: number) {
  const newArray = myArray.slice()
  let newSpare = 49

  const r = 14
  for (let i=0; i<6; i++) newArray[i+r] = myArray[i+r+1]
  newArray[1*r+6] = mySpare
  newSpare = r

  return [newArray, newSpare]
}

const right = function(myArray: number[], mySpare: number) {
  const newArray = myArray.slice()
  let newSpare = 49

  const r = 14
  for (let i=1; i<=6; i++) newArray[i+r] = myArray[i+r-1]
  newArray[r] = mySpare
  newSpare = r+6

  return [newArray, newSpare]
}
