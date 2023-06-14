import PropTypes from 'prop-types';
import React, { useState } from 'react';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';

const endPointForMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
function DrinkObservations({ recipe }) {
  const [meals, setMeals] = useState([]);

  useState(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForMeals);

      setMeals(data.meals);
    };

    fetchApi();
  }, []);

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
    <div>
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

      <section>
        <h4>Recomendações:</h4>
        {
          meals.map((meal, index) => (index < six ? (
            <div key={ index }>
              <p>{ meal.strMeal }</p>
              <img src={ meal.strMealThumb } alt={ meal.strMeal } />
            </div>
          ) : undefined))
        }

      </section>

    </div>
  );
}

DrinkObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default DrinkObservations;
