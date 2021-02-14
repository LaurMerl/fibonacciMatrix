import React, { useState } from 'react';
import Matrix from '../../domain/matrix';
import { findFibonacci, Result } from '../../domain/logic';
import Cell from '../cell/cell.component';

interface Coord {
  x: number;
  y: number;
}

const Board = ({difficulty}: {difficulty: number}) => {
  const [matrixValues, setMatrix] = useState({state: new Matrix<number>(difficulty, 0)});
  const [styleMatrix, setStyleMatrix] = useState({state: new Matrix<string>(difficulty, '')});

  function handleClick(x: number, y: number) {
    matrixValues.state.forEachColumn(x, xValue => xValue + 1)
    matrixValues.state.forEachRow(y, yValue => yValue + 1)
    matrixValues.state.m[x][y] = matrixValues.state.getValueXY(x, y) - 1
    
    let fibonacciMatch = findFibonacci(matrixValues.state)
    let splittedMatch = fibonacciMatch.map(match => splitCoords(match))
    let flatCoords = ([] as Coord[]).concat(...splittedMatch)

    flatCoords.forEach((coord) => {
      styleMatrix.state.setValueXY('green', coord.y, coord.x)
    })

    setStyleMatrix({state: styleMatrix.state})
    setMatrix({state: matrixValues.state})

    if (flatCoords.length > 0) {
      setTimeout(() => {
        flatCoords.forEach((coord) => {
          matrixValues.state.setValueXY(0, coord.y, coord.x)
          styleMatrix.state.setValueXY('', coord.y, coord.x)
        })
          setStyleMatrix({state: styleMatrix.state})
          setMatrix({state: matrixValues.state})    
      }, 3000)
    }
  }

  function splitCoords(result: Result): Array<Coord> {
    let coords = []

    for (let i = result.start; i <= result.end; i++){
        if (result.type === 'column') {
          coords.push({x: result.index, y:i})
        } else {
          coords.push({x:i, y:result.index})
        }
    }

    return coords
  }

  function createBoard() {
    let board: JSX.Element[] = [];

    for (let y = 0; y < difficulty; y++)  {
      let row = []
      for (let x = 0; x < difficulty; x++){
        let props= {props: {x, y, value: matrixValues.state.getValueXY(x, y), style: styleMatrix.state.getValueXY(x, y)}, handleClick}
        row.push(
          <td key={`${x}-${y}`} id={`Cell${x}-${y}`}>
            <Cell {...props}/>
          </td>
        )
      }
      board.push(<tr key={`${y}`}>{row}</tr>)
    }

    return board;
  };

  return (
    <table>
      <tbody>
        {createBoard()}
      </tbody>
    </table>
  );
}

export default Board