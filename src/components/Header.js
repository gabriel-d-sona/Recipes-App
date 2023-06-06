import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const pathSearch = path === '/meals' || path === '/drinks';
  let pageTitle = '';

  if (path === '/meals') {
    pageTitle = 'Meals';
  } else if (path === '/drinks') {
    pageTitle = 'Drinks';
  } else if (path === '/profile') {
    pageTitle = 'Profile';
  } else if (path === '/done-recipes') {
    pageTitle = 'Done Recipes';
  } else if (path === '/favorite-recipes') {
    pageTitle = 'Favorite Recipes';
  }

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
      </Link>
      {pathSearch && (
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />

      )}
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}
