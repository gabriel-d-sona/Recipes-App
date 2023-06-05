import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <img
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        alt="drink"
      />
      <img
        src={ mealIcon }
        data-testid="meals-bottom-btn"
        alt="meal"
      />
    </footer>
  );
}
