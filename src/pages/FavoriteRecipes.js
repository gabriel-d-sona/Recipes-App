import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(storedRecipes);
  }, []);

  const shareBtn = (type, id) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setCopied(true);
  };

  const handleUnfavoriteClick = (index) => {
    const liked = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorited = liked.filter((element) => element.id !== index.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorited));
    setFavoriteRecipes(favorited);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meals') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drinks') }
      >
        Drinks
      </button>

      {
        favoriteRecipes.filter((element) => {
          switch (filter) {
          case 'meals': return element.type === 'meal';
          case 'drinks': return element.type === 'drink';
          default: return element;
          }
        }).map((recipe, index) => (
          <div key={ index }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: 150 } }
                src={ recipe.image }
                alt={ recipe.id }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </p>
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
              {recipe.alcoholicOrNot}
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <button
              type="button"
              onClick={ () => shareBtn(recipe.type, recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Compartilhar"
              />
            </button>
            <button
              type="button"
              onClick={ () => handleUnfavoriteClick(recipe) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Favorite"
              />
            </button>
            {
              copied && <p>Link copied!</p>
            }
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
