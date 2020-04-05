import { IGridState, ITicTacToeState } from "./TicTacToe";

export function updateMatrix(idx: number, userTurn: number, flatGridState: number[]) {
  const newGridState = [...flatGridState]
  if (newGridState[idx] > 0) { return null }

  newGridState[idx] = userTurn 
  return [
    newGridState.slice(0, 3),
    newGridState.slice(3, 6),
    newGridState.slice(6),
  ]
}

export function containsMatchingElement(array: (number)[]): number|null {
  let sample = array[0];
  let match = true
  let idx = 1
  while((idx < array.length) && match) {
    if(array[idx] === sample) {
      idx++
    } else { 
      match = false
    }
  }
  return match ? sample : null
}

export function checkForRowWin(gridState: number[][]): number|null {

  let rowStrike = gridState.find((row: number[]) => {
    let rowNotEmpty = row.filter(value => value !== 0).length
    if(
      rowNotEmpty &&
      containsMatchingElement(row)
    ) return true
    return false
  })

  if(rowStrike) {
    return rowStrike.filter(val => val === 1).length ? 1 :2
  }

  return null
}

interface IColumnWin {
  matchingValue: number;
  columnIdx: number
}
export function checkForColumnWin(gridState: number[][]): IColumnWin|null {
  let columnIdx = 0
  let totalColumns = gridState[0].length - 1
  let foundColumnMatch = false
  let matchingValue;

  while(!foundColumnMatch && columnIdx < totalColumns) {
    matchingValue = containsMatchingElement(
      gridState.map(row => row[columnIdx])
    )
    if(matchingValue){
      foundColumnMatch=true
    } else {
      columnIdx++
    }
  }

  return (matchingValue && foundColumnMatch) ? 
    {
      matchingValue,
      columnIdx
    } :
    null
}

export function checkForDiagonalWin(gridState: number[][]): number|null {
  let backwardDiagonalWin = containsMatchingElement(
    gridState.map((row, idx) => row[idx])
  )
  if(backwardDiagonalWin) {
    return backwardDiagonalWin
  }

  let forwardDiagonalWin = containsMatchingElement(
    gridState.map((row, idx) => row[row.length - (idx + 1)])
  )
  if(forwardDiagonalWin) {
    return forwardDiagonalWin
  }

  return null
}

const checkForWins = (gridState: IGridState) => {
  let rowWin = checkForRowWin(gridState)
  if(rowWin) return {
    player: rowWin,
    winType: "row"
  }

  let comlumnWin = checkForColumnWin(gridState)
  if(comlumnWin) return {
    player: comlumnWin.matchingValue,
    winType: "column"
  }

  let diagonalWin = checkForDiagonalWin(gridState)
  if(diagonalWin) return {
    player: diagonalWin,
    winType: "diagonal"
  }
}

interface IComposeProps { 
  gameState: ITicTacToeState,
  options: {
    newGridState?: IGridState,
    flatGridState: number[],
    cellIdx: number
  }
}

export const updateGridState = (composeProps: IComposeProps): IComposeProps => {
  let userTurn = composeProps.gameState.userTurn
  let { cellIdx, flatGridState } = composeProps.options
  let newGridState = updateMatrix(cellIdx, userTurn, flatGridState)
  if (newGridState) {
    return {
      options: composeProps.options,
      gameState: {
        ...composeProps.gameState,
        gridState: newGridState,
        userTurn: composeProps.gameState.userTurn === 1 ? 2 : 1
      }
    }
  }
  return {
    options: composeProps.options,
    gameState: {
      ...composeProps.gameState,
      warningPrompt: "Please select another cell"
    }
  }
}

export const updateGameLock = (composeProps: IComposeProps): IComposeProps => {
  let win = checkForWins(composeProps.gameState.gridState)
  if(win) {
    return {
      options: composeProps.options,
      gameState: {
        ...composeProps.gameState,
        gameLockState: true,
        winPrompt: `Player ${win.player} wins with a ${win.winType}`
      }
    }
  }
  return composeProps
}

export const checkForNoMoreMoves = (composeProps: IComposeProps): IComposeProps => {
  if(composeProps.gameState.gameLockState) return composeProps

  let foundEmptyCells = composeProps.gameState.gridState.flat().find(cellValue => cellValue===0)
  if(foundEmptyCells === undefined) {
    return {
      options: composeProps.options,
      gameState: {
        ...composeProps.gameState,
        gameLockState: true,
        winPrompt: "No more moves!"
      }
    }
  }

  return composeProps
}