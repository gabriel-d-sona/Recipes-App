import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
  it('renders drink icon', () => {
    const { getByAltText } = render(<Footer />);
    const drinkIcon = getByAltText('drink');
    expect(drinkIcon).toBeInTheDocument();
  });

  it('renders meal icon', () => {
    const { getByAltText } = render(<Footer />);
    const mealIcon = getByAltText('meal');
    expect(mealIcon).toBeInTheDocument();
  });
});
