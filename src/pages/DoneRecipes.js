import React from 'react';
import Header from '../components/Header';
import { DoneMealCard } from '../components/doneMealCard';
import { DoneDrinkCard } from '../components/doneDrinkCard';

function DoneRecipes() {
  const genericDoneRecipes = [{
    id: 'id-da-receita',
    type: 'meal',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['Pasta', 'Curry', 'test'],
  },
  {
    id: 'id-da-receita',
    type: 'drink',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: [],
  }];
  function handleClick(id) {
    const tempInput = document.createElement('input');
    tempInput.value = id;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Link copied!');
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <main>
        <button
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <br />
        <br />
        {
          genericDoneRecipes.filter((e) => e.type === 'meal')
            .map((recipe, i) => (
              <DoneMealCard
                key={ recipe.name }
                index={ i }
                name={ recipe.name }
                image={ recipe.image }
                category={ recipe.category }
                doneDate={ recipe.doneDate }
                nationality={ recipe.nationality }
                tagName={ recipe.tags.slice(0, 2) }
                handleClick={ () => handleClick(`/meals/:${recipe.id}/in-progress`) }
              />
            ))
        }
        {
          genericDoneRecipes.filter((e) => e.type === 'drink')
            .map((recipe, i) => (
              <DoneDrinkCard
                key={ recipe.name }
                index={ i }
                name={ recipe.name }
                image={ recipe.image }
                doneDate={ recipe.doneDate }
                handleClick={ () => handleClick(`/meals/:${recipe.id}/in-progress`) }
              />
            ))
        }
      </main>
    </div>
  );
}
export default DoneRecipes;
