import { checkForRowWins } from "../utilities";

describe("utils", () => {
  describe("checkForRowWins", () => {
    test("Player 1 wins", () => {
      let rowOneWin = checkForRowWins([
        Array(3).fill(1),
        [1,0,2],
        Array(3).fill(0)
      ])
      expect(rowOneWin).toBe(1)
    })
    test("Player 2 wins", () => {
      let rowOneWin = checkForRowWins([
        [1,0,2],
        Array(3).fill(2),
        Array(3).fill(0)
      ])
      expect(rowOneWin).toBe(2)
    })
  })
})
