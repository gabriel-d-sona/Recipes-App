import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css';
import { getLocalStorage } from '../services/helpers/localStorage';
import './btnStartAndContinue.css';

const endPointForMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
function DrinkObservations({ recipe }) {
  const recipeId = useParams();
  const [meals, setMeals] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const { drinksId } = recipeId;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForMeals);

      setMeals(data.meals);
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
        .map((element) => (element.id === drinksId && (setIsDone(true))));
    }
    if (inProgressRecipes.drinks[drinksId]) {
      Object.keys(inProgressRecipes.drinks)
        .map((element) => element === drinksId && setInProgress(true));
    }
  }, [doneRecipes, drinksId, inProgressRecipes]);

  // useEffect(() => {
  //   if (inProgressRecipes) {
  //     Object.keys(inProgressRecipes.drinks)
  //       .map((element) => element === drinksId && setInProgress(true));
  //   }
  // }, [inProgressRecipes, drinksId]);

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
        !isDone ? (
          <button
            data-testid="start-recipe-btn"
            className="btn-start-continue"
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
    </div>
  );
}

DrinkObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default DrinkObservations;
