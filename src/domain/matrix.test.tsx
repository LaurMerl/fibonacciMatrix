import { fibonacciAcc } from "./logic";
import Matrix from "./matrix";

const matrixDimension = 5
const startValue = 0
let testMatrix = new Matrix<number>(matrixDimension, startValue)

test('Matrix is initialized with startValue', async () => {
  expect(testMatrix.m[0].length).toEqual(matrixDimension)
  testMatrix.m.forEach(row => {
    expect(row.length).toEqual(matrixDimension)
    expect(row.every((currentValue) => currentValue === startValue)).toBe(true)
  });
});

test('Set value in a specific cell', async () => {
  testMatrix.setValueXY(12, 1, 2)
  expect(testMatrix.m[1][2]).toEqual(12)
});

test('Get value for a specific cell', async () => {
  testMatrix.getValueXY(1, 2)
  expect(testMatrix.m[1][2]).toEqual(12)
});

test('Apply function for a specific column', async () => {
  testMatrix.forEachColumn(1, xValue => xValue + 1)
  expect(testMatrix.m).toEqual([
    [ 0, 0, 0, 0, 0 ],
    [ 1, 1, 13, 1, 1 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ])
});

test('Apply function for a specific row', async () => {
  testMatrix.forEachRow(1, xValue => xValue + 1)
  expect(testMatrix.m).toEqual([
    [ 0, 1, 0, 0, 0 ],
    [ 1, 2, 13, 1, 1 ],
    [ 0, 1, 0, 0, 0 ],
    [ 0, 1, 0, 0, 0 ],
    [ 0, 1, 0, 0, 0 ]
  ])
});

const zero = {
  target: -1,
  previous: -1,
  start: -1,
  end: -1,
}

test('Fold a row with a specific accumulator', async () => {
  testMatrix.m = [
    [ 0, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0 ],
    [ 2, 0, 0, 0, 0 ],
    [ 3, 0, 0, 0, 0 ]
  ];
  let rowResult = testMatrix.foldRow(0, zero, fibonacciAcc)
  expect(rowResult).toEqual({
    "target": 5,
    "previous": 3,
    "start": 0,
    "end": 4,
  })
});

test('Fold a column with a specific accumulator', async () => {
  testMatrix.m = [
    [ 0, 1, 1, 2, 3 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ];

  let rowResult = testMatrix.foldColumn(0, zero, fibonacciAcc)
  expect(rowResult).toEqual({
    "target": 5,
    "previous": 3,
    "start": 0,
    "end": 4,
  })
});
