import { checkForRowWin, checkForColumnWin, containsMatchingElement } from "../utils";

describe("utils", () => {
  describe("checkForRowWin", () => {
    test("Player 1 wins", () => {
      let rowOneWin = checkForRowWin([
        Array(3).fill(1),
        [1,0,2],
        Array(3).fill(0)
      ])
      expect(rowOneWin).toBe(1)
    })
    test("Player 2 wins", () => {
      let rowOneWin = checkForRowWin([
        [1,0,2],
        Array(3).fill(2),
        Array(3).fill(0)
      ])
      expect(rowOneWin).toBe(2)
    })
  })
  describe("containsMatchingElements", () => {
    test("returns true if all array's elements are matching", () => {
      expect(containsMatchingElement([1,1,1])).toBe(1)
      expect(containsMatchingElement([2,2,2])).toBe(2)
    })
    test("returns false if any of array's elements are not matching", () => {
      expect(containsMatchingElement([1,1,1,0])).toBe(null)
    })
  })
  describe("checkForColumnWins", () => {
    test("Player 1 wins on the first column", () => {
      let rowOneWin = checkForColumnWin([
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
      ])
      expect(rowOneWin).toEqual({ matchingValue: 1, columnIdx: 0 })
    })
    test("Player 2 wins on the second column", () => {
      let rowTwoWin = checkForColumnWin([
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 0]
      ])
      expect(rowTwoWin).toEqual({ matchingValue: 2, columnIdx: 1 })
    })
    test("Player 2 wins on the second column", () => {
      let rowOneWin = checkForColumnWin([
        [1, 2, 0],
        [2, 1, 1],
        [0, 2, 0]
      ])
      expect(rowOneWin).toBeNull()
    })
  })
})
