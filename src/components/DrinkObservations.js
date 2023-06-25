import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css';
import { getLocalStorage, setLocalStorage } from '../services/helpers/localStorage';
import './btnStartAndContinue.css';
import './btnFavoriteRecipe.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const endPointForMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
function DrinkObservations({ recipe, history }) {
  const recipeId = useParams();
  const [meals, setMeals] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { drinksId } = recipeId;

  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = recipe[0];

  const strIngredients = filterArrays(recipe[0], 'strIngredient');
  const strMeasures = filterArrays(recipe[0], 'strMeasure');

  const six = 6;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForMeals);
      setMeals(data.meals);

      const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favorite = favoritesRecipes.some((item) => (item.id === drinksId));
      setIsFavorite(favorite);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const done = getLocalStorage('doneRecipes');
    if (done && done.length) {
      done
        .map((element) => (element.id === drinksId && (setIsDone(true))));
    }
    const progress = getLocalStorage('inProgressRecipes');
    if (progress && progress.drinks) {
      Object.keys(progress.drinks)
        .map((element) => element === drinksId && setInProgress(true));
    }
  }, [drinksId]);

  const handleOnClickButtonStartRecipe = () => {
    history.push(`/drinks/${drinksId}/in-progress`);
  };

  const handleOnClickButtonShare = () => {
    const url = window.location.href;
    copy(url);
    setIsCopy(true);
  };

  const handleOnClickButtonFavorite = () => {
    const favoriteRecipe = {
      id: drinksId,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const favoritesRecipes = getLocalStorage('favoriteRecipes');
    if (favoritesRecipes && favoritesRecipes.length > 0) {
      const newFavoritesRecipes = [...favoritesRecipes];
      newFavoritesRecipes.push(favoriteRecipe);
      setLocalStorage('favoriteRecipes', newFavoritesRecipes);
    } else {
      setLocalStorage('favoriteRecipes', [favoriteRecipe]);
    }
    setIsFavorite(true);
  };

  return (
    <div
      className="div-absolute"
    >
      <section key={ idDrink }>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
        />
        <h1
          data-testid="recipe-title"
        >
          {strDrink}

        </h1>
        <h3
          data-testid="recipe-category"
        >
          {strCategory}
          {' '}
          |
          {' '}
          {strAlcoholic}

        </h3>

        <h4>Ingredientes:</h4>

        <section>
          {
            strIngredients.map((ingredient, index) => (
              <ul key={ index }>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient[1]}

                </li>
              </ul>
            ))
          }

          {
            strMeasures.map((measure, index) => (
              <ul key={ index }>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {measure[1]}

                </li>
              </ul>
            ))
          }
        </section>

        <h4>Instruções:</h4>
        <p
          data-testid="instructions"
        >
          {strInstructions}

        </p>
      </section>

      <h4>Recomendações:</h4>
      <Carousel>
        {
          meals.map((meal, index) => (index < six ? (
            <Carousel.Item key={ index }>
              <div data-testid={ `${index}-recommendation-card` }>
                <div className="carousel-container">
                  <img
                    className="img-carousel"
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <h4
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strMeal}

                  </h4>
                </div>
              </div>
            </Carousel.Item>
          ) : undefined))
        }
      </Carousel>
      {
        !isDone && !inProgress ? (
          <button
            data-testid="start-recipe-btn"
            className="btn-start-continue"
            onClick={ handleOnClickButtonStartRecipe }
          >
            Start Recipe
          </button>
        ) : (
          null
        )
      }
      <div
        className="container-btns"
      >
        {
          inProgress ? (
            <button
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>
          ) : null
        }
        <div>

          <button
            data-testid="share-btn"
            onClick={ handleOnClickButtonShare }
          >
            Share
          </button>
          {
            isCopy ? (
              <h5>Link copied!</h5>
            ) : null
          }
        </div>

        <button
          data-testid="favorite-btn"
          className="favorite-btn"
          onClick={ handleOnClickButtonFavorite }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
        </button>
      </div>
    </div>
  );
}

DrinkObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default DrinkObservations;
