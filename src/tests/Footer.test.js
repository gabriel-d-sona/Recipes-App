import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer';

test('redireciona ao clicar nos botões', () => {
  const { getByTestId } = render(
    <Router>
      <Footer />
    </Router>,
  );

  const drinksBtn = getByTestId('drinks-bottom-btn');
  fireEvent.click(drinksBtn);
  expect(window.location.pathname).toBe('/drinks');

  const mealsBtn = getByTestId('meals-bottom-btn');
  fireEvent.click(mealsBtn);
  expect(window.location.pathname).toBe('/meals');
});
