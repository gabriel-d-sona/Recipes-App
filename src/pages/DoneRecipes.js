import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
  const history = useHistory();
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(recipes);
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [handleCheckbox, setHandleCheckBox] = useState({ meals: false, drinks: false });
  const [copy, setCopy] = useState(false);

  async function handleShareClick(id, type) {
    console.log(type);
    if (type === 'meal') {
      await navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    } else {
      await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    }
    setCopy(true);
  }

  function handleFilterClick({ target }) {
    const { value, checked } = target;

    if (value === 'meals') {
      const Meals = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(Meals);
      setHandleCheckBox({ ...handleCheckbox, meals: true });
    }
    if (value === 'drinks') {
      const Drinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(Drinks);
      setHandleCheckBox({ ...handleCheckbox, drinks: true });
    }
    if (!checked) {
      setHandleCheckBox({ [value]: false });
      setDoneRecipes(recipes);
    }

    if (value === 'All') {
      setHandleCheckBox({ drinks: false, meals: false });
      setDoneRecipes(recipes);
    }
  }

  function handleDetailsClick(id, type) {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <main>
        <label>
          Meals
          <input
            checked={ handleCheckbox.meals }
            type="checkbox"
            value="meals"
            data-testid="filter-by-meal-btn"
            onChange={ (e) => handleFilterClick(e) }
          />
        </label>
        <label>
          Drinks
          <input
            checked={ handleCheckbox.drinks }
            type="checkbox"
            value="drinks"
            data-testid="filter-by-drink-btn"
            onChange={ (e) => handleFilterClick(e) }
          />
        </label>
        <button
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          onClick={ (e) => handleFilterClick(e) }
        >
          All
        </button>
        <br />
        <br />
        { doneRecipes.map((recipe, i) => (
          <RecipeCard
            doneDate={ recipe.doneDate }
            key={ recipe.name }
            name={ recipe.name }
            type={ recipe.type }
            index={ i }
            isAlcoholic={ recipe.alcoholicOrNot }
            image={ recipe.image }
            category={ recipe.category }
            nationality={ recipe.nationality }
            tagName1={ recipe.tags[0] }
            tagName2={ recipe.tags[1] }
            handleDetailsClick={ () => handleDetailsClick(recipe.id, recipe.type) }
            handleClick={ () => handleShareClick(recipe.id, recipe.type) }
          />
        )) }
        { copy && (
          <span>
            Link copied!
          </span>
        ) }
      </main>
    </div>
  );
}
export default DoneRecipes;
