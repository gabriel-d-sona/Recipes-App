import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
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

const endPointForDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
function MealObservations({ recipe, history }) {
  const recipeId = useParams();
  const [drinks, setDrinks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const { mealsId } = recipeId;

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = recipe[0];

  const strIngredients = filterArrays(recipe[0], 'strIngredient');
  const strMeasures = filterArrays(recipe[0], 'strMeasure');

  const six = 6;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForDrinks);

      setDrinks(data.drinks);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const done = getLocalStorage('doneRecipes');
    if (done && done.length) {
      done
        .map((element) => (element.id === mealsId && (setIsDone(true))));
    }

    const progress = getLocalStorage('inProgressRecipes');
    if (progress && progress.meals) {
      Object.keys(progress.meals)
        .map((element) => element === mealsId && setInProgress(true));
    }
  }, [mealsId]);

  const handleOnClickButtonStartRecipe = () => {
    history.push(`/meals/${mealsId}/in-progress`);
  };

  const handleOnClickButtonShare = () => {
    const url = window.location.href;
    copy(url);
    setIsCopy(true);
  };

  const handleOnClickButtonFavorite = () => {
    const favoriteRecipe = {
      id: mealsId,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const favoritesRecipes = getLocalStorage('favoriteRecipes');
    if (favoritesRecipes && favoritesRecipes.length > 0) {
      const newFavoritesRecipes = [...favoritesRecipes];
      newFavoritesRecipes.push(favoriteRecipe);
      setLocalStorage('favoriteRecipes', newFavoritesRecipes);
    } else {
      setLocalStorage('favoriteRecipes', [favoriteRecipe]);
    }
  };

  const six = 6;

  return (
    <div
      className="div-absolute"
    >

      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {strMeal}

      </h1>
      <h3
        data-testid="recipe-category"
      >
        {strCategory}

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

      <iframe
        width="560"
        height="315"
        src={ strYoutube }
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;
              picture-in-picture; web-share"
        data-testid="video"
      />

      <h4>Recomendações:</h4>
      <Carousel>
        {
          drinks.map((drink, index) => (index < six ? (
            <Carousel.Item key={ index }>
              <div data-testid={ `${index}-recommendation-card` }>
                <div className="carousel-container">
                  <img
                    className="img-carousel"
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <h4
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}

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
          onClick={ handleOnClickButtonFavorite }
        >
          Favorite
        </button>
      </div>
    </div>
  );
}

MealObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default MealObservations;
