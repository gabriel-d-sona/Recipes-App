import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { DoneMealCard } from '../components/doneMealCard';
import { DoneDrinkCard } from '../components/doneDrinkCard';

function DoneRecipes() {
  const history = useHistory();

  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  console.log(doneRecipes);
  const [handleCheckbox, setHandleCheckBox] = useState({ meals: false, drinks: false });

  function handleShareClick(id) {
    const tempInput = document.createElement('input');
    tempInput.value = id;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Link copied!');
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
        {
          doneRecipes.filter((e) => e.type === 'meal')
            .map((recipe, i) => (
              <DoneMealCard
                key={ recipe.name }
                index={ i }
                name={ recipe.name }
                image={ recipe.image }
                category={ recipe.category }
                doneDate={ recipe.doneDate }
                nationality={ recipe.nationality }
                tagName={ recipe.tags }
                handleClick={ () => handleShareClick(`/meals/${recipe.id}`) }
                handleDetailsClick={ () => handleDetailsClick(recipe.id, recipe.type) }
              />
            ))
        }
        {
          doneRecipes.filter((e) => e.type === 'drink')
            .map((recipe, i) => (
              <DoneDrinkCard
                key={ recipe.name }
                index={ i }
                name={ recipe.name }
                image={ recipe.image }
                doneDate={ recipe.doneDate }
                handleClick={ () => handleShareClick(`/drinks/${recipe.id}`) }
                handleDetailsClick={ () => handleDetailsClick(recipe.id, recipe.type) }
              />
            ))
        }
      </main>
    </div>
  );
}

export default DoneRecipes;
