// import {describe, expect, it} from '@jest/globals'
import { createTileSet } from './Tile'

describe('create tile set function', () => {
  // test('returns 1 spare tile', () => {
  // test('returns 49 tiles', () => {

  test('returns 49 tiles who\'s UIDs are numbered sequentially', () => {
    const tileSet = createTileSet()
    const numsActual = tileSet.board.map(t => t.uid)
    const numsExpected = Array.from(new Array(49).fill(0).keys())
    expect(numsActual).toEqual(numsExpected)
  })
})
