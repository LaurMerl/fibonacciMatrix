import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Board from './board.component';

const difficulty = {difficulty: 5}
test('Board component is rendered', async () => {
  render(<Board {...difficulty} />)
  expect(screen.getByRole('table')).toBeInTheDocument()
});

test('Click on cell should increase cell value', async () => {
  render(<Board {...difficulty} />)

  let td = document.querySelector("#Cell0-0")
  let c = td?.getElementsByClassName("cell").item(0)

  expect(c).toHaveTextContent("0")

  if(c){
    fireEvent.click(c)
    return expect(c).toHaveTextContent("1")
  }
  expect(true).toBe(false)
});

// TODO: test on Fibonacci match: highlight and reset
