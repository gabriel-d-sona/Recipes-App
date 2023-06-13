import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';

const endPointForDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
function MealObservations({ recipe }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await requestApi(endPointForDrinks);

      setDrinks(data.drinks);
    };

    fetchApi();
  }, []);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe[0];

  const strIngredients = filterArrays(recipe[0], 'strIngredient');
  const strMeasures = filterArrays(recipe[0], 'strMeasure');

  return (
    <div>

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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
              picture-in-picture; web-share"
        allowfullscreen
        data-testid="video"
      />

    </div>
  );
}

MealObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default MealObservations;
