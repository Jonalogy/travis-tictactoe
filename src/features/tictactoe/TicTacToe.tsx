import React, { useState, useEffect } from 'react'
import './TicTacToe.scss'
import { updateMatrix, checkForRowWin, checkForColumnWin } from './utilities';

const defaultUserTurnState = 1
const defaultGridState = Array(3).fill(Array(3).fill(0))
export const TicTacToe = () => {
  const [userTurn, updateUserTurn] = useState(defaultUserTurnState)
  const [gridState, updateGridState] = useState(defaultGridState)
  const flatGridState = gridState.flat()

  const reset = () => {
    updateGridState(defaultGridState);
    updateUserTurn(defaultUserTurnState)
  }
  const checkForWins = () => {
    console.log("checkForWins")

    let rowWin = checkForRowWin(gridState)
    if(rowWin) {
      alert(`Player ${rowWin} made a row win!`)
      return true
    }

    let comlumnWin = checkForColumnWin(gridState)
    if(comlumnWin) {
      alert(`Player ${comlumnWin} made a column win!`)
      return true
    }
  }
  const checkForNoMoreMoves = () => {
    let foundEmptyCells = flatGridState.find(cellValue => cellValue===0)
    if(foundEmptyCells === undefined) {
      alert("No more turns!")
      reset()
    }
  }

  useEffect(() => {
    checkForWins() || checkForNoMoreMoves()
  })

  const onCellClick = (idx: number, userTurn: number, flatGridState: number[]) => () => {
    let newGridState = updateMatrix(idx, userTurn, flatGridState)
    if( newGridState === null) {
      return alert("Please select another cell")
    }

    updateGridState(newGridState)
    updateUserTurn(userTurn===1 ? 2 : 1)
  }

  return (
    <div>
      <div className={"TicTacToe"}>
        {
          flatGridState
            .map((cellValue: any, idx) => {
              let cellProps = {
                idx,
                cellValue,
                onCellClick: onCellClick(idx, userTurn, flatGridState)
              }
              return <GridCell key={`cell-${idx}`} {...cellProps} />
            })
        }
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

const GridCell = (props: any) => {
  return (
    <React.Fragment >
      <button className={"grid-item"}
        onClick={props.onCellClick}>
        { props.cellValue }
      </button>
    </React.Fragment>
  )
}
