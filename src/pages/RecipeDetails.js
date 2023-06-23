import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestApiByid from '../services/helpers/requestApiById';
import MealObservations from '../components/MealObservations';
import DrinkObservations from '../components/DrinkObservations';

const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeDetails({ history }) {
  const recipeId = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      if (recipeId.mealsId) {
        const data = await requestApiByid(urlMeals, recipeId.mealsId);
        setRecipe(data.meals);
      }
      if (recipeId.drinksId) {
        const data = await requestApiByid(urlDrinks, recipeId.drinksId);
        setRecipe(data.drinks);
      }
    };

    fetchById();
  }, []);

  return (
    <div>
      {
        recipe ? (
          <div>
            {
              recipeId.mealsId ? (
                <MealObservations recipe={ recipe } history={ history } />
              ) : (
                <DrinkObservations recipe={ recipe } history={ history } />
              )
            }
          </div>
        ) : (
          <p> Carregando ...</p>
        )

      }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default RecipeDetails;
