import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('Test footer', () => {
  render(<Footer />);

  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  const mealIcon = screen.getByTestId('meals-bottom-btn');

  expect(drinkIcon).toBeInTheDocument();
  expect(mealIcon).toBeInTheDocument();
});
