import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function RecipeInProgress() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [checkedIngredients, setCheckedIngredients] = useState([]); // Estado para os ingredientes marcados

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const isDrinkRoute = location.pathname.includes('/drinks/');
      const apiUrl = isDrinkRoute
        ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.meals || data.drinks) {
        setRecipeDetails(data.meals ? data.meals[0] : data.drinks[0]);
      }
      setIsLoading(false);
    };
    fetchRecipeDetails();

    // Verifica localStorage
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isDrinkRoute = location.pathname.includes('/drinks/');
    const recipeType = isDrinkRoute ? 'drinks' : 'meals';
    // recipe type ABENÇOADO NAO ESTAVA VERIFICADO NO LOCALSTORAGE
    if (savedProgress && savedProgress[recipeType] && savedProgress[recipeType][id]) {
      setCheckedIngredients(savedProgress[recipeType][id]);
    // correção do saveProgress[recipeType][id] para acessar os ingredientes no localstorage
    }
  }, [id, location]);

  if (isLoading) return <div>Loading...</div>;

  const MAX_INGREDIENTS = 50;

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const handleCheckIngredient = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    if (newCheckedIngredients.includes(index)) {
      newCheckedIngredients.splice(newCheckedIngredients.indexOf(index), 1);
    } else {
      newCheckedIngredients.push(index);
    }
    setCheckedIngredients(newCheckedIngredients);

    // Atualiza o localStorage
    const savedProgress = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || { drinks: {}, meals: {} };
    const isDrinkRoute = location.pathname.includes('/drinks/');
    const recipeType = isDrinkRoute ? 'drinks' : 'meals';
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...savedProgress,
        [recipeType]: {
          ...savedProgress[recipeType],
          [id]: newCheckedIngredients,
        },
      }),
    );
  };

  const ingredients = getIngredients(recipeDetails);
  // verifica se os ingredientes estão marcados
  const allIngredientsChecked = ingredients.length === checkedIngredients.length;

  return (
    <div>
      <h1>Receitas em Progresso!</h1>
      {recipeDetails.strMeal || recipeDetails.strDrink ? (
        <>
          <img
            src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
            alt="Receita a ser fe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">
            {recipeDetails.strMeal || recipeDetails.strDrink}
          </h2>
          <h2 data-testid="recipe-category">
            {recipeDetails.strCategory || recipeDetails.strAlcoholic}
          </h2>
          <h2>Ingredientes da receita</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  htmlFor="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                  style={
                    checkedIngredients.includes(index)
                      ? { textDecoration: 'line-through' }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={ checkedIngredients.includes(index) }
                    onChange={ () => handleCheckIngredient(index) }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>

          <h2>Instruções</h2>
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <button data-testid="share-btn">Compartilhar</button>
          <button data-testid="favorite-btn">Favoritar</button>

          <button data-testid="finish-recipe-btn" disabled={ !allIngredientsChecked }>
            Sua receita esta pronta!
          </button>
        </>
      ) : (
        <p>Receita não encontrada</p>
      )}
    </div>
  );
}

export default RecipeInProgress;
