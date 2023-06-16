import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css';
import { getLocalStorage } from '../services/helpers/localStorage';
import './btnStartAndContinue.css';

const endPointForDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
function MealObservations({ recipe, history }) {
  const recipeId = useParams();
  const [drinks, setDrinks] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const { mealsId } = recipeId;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForDrinks);

      setDrinks(data.drinks);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const done = getLocalStorage('doneRecipes');
    setDoneRecipes(done);
    const progress = getLocalStorage('inProgressRecipes');
    setInProgressRecipes(progress);
  }, [doneRecipes, inProgressRecipes]);

  useEffect(() => {
    if (doneRecipes) {
      doneRecipes
        .map((element) => (element.id === mealsId && (setIsDone(true))));
    }
    // if (inProgressRecipes.meals[mealsId]) {
    //   Object.keys(inProgressRecipes.meals)
    //     .map((element) => element === mealsId && setInProgress(true));
    // }
  }, [doneRecipes, mealsId, inProgressRecipes]);

  // useEffect(() => {
  //   if (inProgressRecipes) {
  //     Object.keys(inProgressRecipes.meals)
  //       .map((element) => element === mealsId && setInProgress(true));
  //   }
  // }, [inProgressRecipes, mealsId]);

  const handleOnClickButtonStartRecipe = () => {
    // <Redirect to={ `/meals/${mealsId}/in-progress` } />;
    history.push(`/meals/${mealsId}/in-progress`);
  };

  console.log(history);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe[0];

  const strIngredients = filterArrays(recipe[0], 'strIngredient');
  const strMeasures = filterArrays(recipe[0], 'strMeasure');

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
        !isDone ? (
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

      {
        inProgress ? (
          <button
            data-testid="start-recipe-btn"
            className="btn-start-continue"
          >
            Continue Recipe
          </button>
        ) : null
      }
      <button
        data-testid="share-btn"
      >
        Share
      </button>

      <button
        data-testid="favorite-btn"
      >
        Favorite
      </button>
    </div>
  );
}

MealObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default MealObservations;
