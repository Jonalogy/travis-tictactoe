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

export function checkForRowWin(gridState: number[][]): number|null {

  let rowStrike = gridState.find((row: number[]) => {
    let rowNotEmpty = row.filter(value => value !== 0).length
    if(
      rowNotEmpty &&
      row[0]===row[1] &&
      row[1]===row[2]
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