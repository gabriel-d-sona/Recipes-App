import React, { useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

export default function Header() {
  const [clickedBar, setClickedBar] = useState(false);

  const {
    setSearchBarString,
  } = useContext(RecipesContext);

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

  const handleSearchChange = ({ target }) => {
    setSearchBarString(target.value);
  };

  const searchClick = () => {
    setClickedBar(!clickedBar);
  };

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
      </Link>

      {pathSearch && (
        <button
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ searchClick }
        >
          <img src={ searchIcon } alt="Ícone de pesquisa" />
        </button>
      )}

      {clickedBar && <input
        onChange={ handleSearchChange }
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
      /> }

      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}
