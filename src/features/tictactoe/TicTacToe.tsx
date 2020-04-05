import React, { useState, useEffect } from 'react'
import './TicTacToe.scss'
import { updateGridState, updateGameLock, checkForNoMoreMoves } from './utils';

export type IGridState = number[][]
export interface ITicTacToeState {
  gridState: IGridState;
  gameLockState: boolean;
  userTurn: number;
  winPrompt: string;
  warningPrompt: string;
}
const defaultTicTacToeState: ITicTacToeState = {
  gridState: Array(3).fill(Array(3).fill(0)),
  userTurn: 1,
  gameLockState: false,
  winPrompt: "",
  warningPrompt: ""
}

export const TicTacToe: React.FC<{}> = () => {
  const [gameState, updateGameState] = useState(defaultTicTacToeState)
  const flatGridState = gameState.gridState.flat()

  useEffect(() => {
    if(gameState.warningPrompt) {
      alert(gameState.warningPrompt)
      return updateGameState({
        ...gameState,
        warningPrompt: ""
      })
    }
    gameState.winPrompt && alert(gameState.winPrompt)
  }, [gameState])

  const reset = () => updateGameState(defaultTicTacToeState)
  const onCellClick = (idx: number) => {
    return () => {
      let newGameState = [
        updateGridState,
        updateGameLock,
        checkForNoMoreMoves
      ].reduce(
        (acc, fn) => fn(acc),
        { gameState, options: { flatGridState, cellIdx: idx } }
      ).gameState

      updateGameState(newGameState)
    }
  }

  return (
    <div>
      <div className={"TicTacToe"}>
        {
          flatGridState
            .map((cellValue: any, idx) => {
              let cellProps = {
                cellValue,
                lockGame: gameState.gameLockState,
                onCellClick: onCellClick(idx)
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
    <button className={"grid-item"}
      onClick={props.onCellClick}
      disabled={props.lockGame}>
      { props.cellValue }
    </button>
  )
}
