import Matrix from "./matrix"

export interface Result {
  type: 'row' | 'column';
  index: number;
  start: number;
  end: number;
}

interface Accumulator {
  target: number;
  previous: number;
  start: number;
  end: number;
}

export function fibonacciAcc(currentValue: number, index: number, acc: Accumulator): Accumulator {
   //case 0: start of parsing
  if (acc.previous === -1) {

    return {
      target: -1,
      previous: currentValue,
      start: index,
      end: index,
    }
  }


  //  case 1: find first number for sequence
  if ( acc.target === -1 && currentValue !==0) {
    return {
      target: currentValue + acc.previous,
      previous: currentValue,
      start: acc.start,
      end: index,
    }
  }

  //  case n: number for sequence
  if (acc.target === currentValue && currentValue !==0) {
    return {
      target: currentValue + acc.previous,
      previous: currentValue,
      start: acc.start,
      end: index,
    }
  }
 // check end condition
  if (acc.end - acc.start >= 4) {
    return acc
  }
  // default
  return {
    target: -1,
    previous: currentValue,
    start: index,
    end: -1,
  }
}

function findFibonacci(m: Matrix<number>): Array<Result> {
  let zero = {
    target: -1,
    previous: -1,
    start: -1,
    end: -1,
  }

  let result: Array<Result> = []

  for (let i = 0; i < m.size; i++) {
    let columnResult = m.foldColumn(i, zero, fibonacciAcc)

    if (columnResult.end - columnResult.start >=  4 &&  columnResult.start !== -1) {
      result.push({
        type: 'row',
        index: i,
        start: columnResult.start,
        end: columnResult.end,
      })
    }

    let rowResult = m.foldRow(i, zero, fibonacciAcc)

    if (rowResult.end - rowResult.start >= 4 &&  rowResult.start !== -1) {
      result.push({
        type: 'column',
        index: i,
        start: rowResult.start,
        end: rowResult.end,
      })
    }
  }

  return result
}

export {findFibonacci}

