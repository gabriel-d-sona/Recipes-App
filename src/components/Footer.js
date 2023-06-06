import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <a href="drinks">
          <img src={ drinkIcon } alt="drink" />
        </a>
      </Link>
      <Link to="/meals" data-testid="meals-bottom-btn">
        <a href="/meals">
          <img src={ mealIcon } alt="meal" />
        </a>
      </Link>
    </footer>
  );
}
