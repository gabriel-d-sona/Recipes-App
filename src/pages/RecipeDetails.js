import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestApiByid from '../services/helpers/requestApiById';

const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeDetails() {
  const recipeId = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      if (recipeId.mealsId) {
        const data = await requestApiByid(urlMeals, recipeId.mealsId);
        setRecipe(data);
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
      RecipeDetails
    </div>
  );
}

export default RecipeDetails;
