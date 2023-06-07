import PropTypes from 'prop-types';
import React from 'react';
import filterArrays from '../services/helpers/filterArrays';

function DrinkObservations({ recipe }) {
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

    </div>
  );
}

DrinkObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default DrinkObservations;
