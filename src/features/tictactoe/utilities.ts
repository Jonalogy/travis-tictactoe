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

export function checkForRowWins(gridState: number[][]): number | null {

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