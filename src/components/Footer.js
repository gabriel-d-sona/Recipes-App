import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">

        <img
          src={ drinkIcon }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="meal"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
