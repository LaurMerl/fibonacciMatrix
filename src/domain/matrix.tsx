export default class Matrix<T> {
  m: Array<T[]>;
  size: number;

  constructor(size: number, startValue: T) {
    this.m = []
    
    for (let i=0; i<size; i++) {
      this.m.push([])
      for (let e=0; e<size; e++) {
        this.m[i].push(startValue)
      }    
    }    
    this.size = size
  }

  public setValueXY(value: T, x: number, y: number) {
    this.m[x][y] = value
  }

  public getValueXY(x: number, y: number) {
    return this.m[x][y]
  }

  public forEachColumn(rowIndex: number, f:(value: T) => T) {
    for (let i=0; i < this.size; i++) {
      this.m[rowIndex][i] = f(this.m[rowIndex][i])
    }
  }

  public forEachRow(columnIndex: number, f:(value: T) => T) {
    for (let i=0; i < this.size; i++) {
      this.m[i][columnIndex] = f(this.m[i][columnIndex])
    }
  }

  public foldRow<V>(columnIndex: number, zero: V, f:(currentValue: T, currentIndex: number, acc: V) => V): V {
    let accumulator = zero;

    for (let i=0; i < this.size; i++) {
      accumulator = f(this.m[i][columnIndex], i,  accumulator)
    }

    return accumulator
  }

  public foldColumn<V>(rowIndex: number, zero: V, f:(currentValue: T, currentIndex: number, acc: V) => V): V {
    let accumulator = zero;

    for (let i=0; i < this.size; i++) {
      accumulator = f(this.m[rowIndex][i], i, accumulator)
    }

    return accumulator
  }
}
