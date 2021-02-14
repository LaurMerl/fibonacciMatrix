import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders', () => {
  render(<App />);
  const titleElement = screen.getByText(/Fibonacci/i);
  expect(titleElement).toBeInTheDocument();
});
