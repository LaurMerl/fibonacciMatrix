import React from 'react';
import '@testing-library/jest-dom';
import Cell, { CellProps } from './cell.component';
import { render, screen } from '@testing-library/react';

const testElementProps: CellProps = {
  props: {
    x: 0,
    y: 0,
    value: 2,
    style: '',
  },
  handleClick: (_, __) => {}
}

test('Cell element is rendered', async () => {
  render(<Cell {...testElementProps} />)
  expect(screen.getByText(/2/i)).toBeInTheDocument()
});
