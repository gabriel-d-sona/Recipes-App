import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import Header from '../components/Header';

// Explicação da aplicação requisito 19: a página de receitas tem duas possíves rotas, a /drinks e a /meals,
// a página nos trás informações sobre receitas e depende de sua rota para mostrar um devido tipo, no caso entre comidas e bebidas.

export default function Recipes() {
  // Aqui capturamos a rota que está sendo utilizada para se acessar a página.
  const currentPath = window.location.pathname;
  const isMealRoute = currentPath === '/meals';

  const [recipes, setRecipes] = useState([]);

  // Esse use effect faz um fetch assim que a página é montada de acordo com a rota utilizada e capturada no código sinalizado acima.
  useEffect(() => {
    const n = 12;
    if (isMealRoute) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ meals }) => {
          const treatedData = meals.slice(0, n);
          setRecipes(treatedData);
          console.log(recipes);
        });
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ drinks }) => {
          const treatedData = drinks.slice(0, n);
          setRecipes(treatedData);
          console.log(recipes);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        {/* Aqui Fazemos uso do operador ternario e do componente ../components/Card criado para essa aplicação,
      dependendo de qual rota estiver sendo utilizada a página renderiza os 12
      primeiros itens da lista que de receitas que a devida API nos retorna.
    (O requisito pede que sejam renderizados apenas os primeiros 12 itens.)  */}
        { isMealRoute ? recipes.map((recipe, i) => (
          <Card
            key={ recipe.strMeal }
            name={ recipe.strMeal }
            imgSrc={ recipe.strMealThumb }
            SrcIndex={ i }
          />
        )) : recipes.map((recipe, i) => (
          <Card
            key={ recipe.strDrink }
            name={ recipe.strDrink }
            imgSrc={ recipe.strDrinkThumb }
            SrcIndex={ i }
          />
        ))}
      </main>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';

// Explicação da aplicação requisito 19: a página de receitas tem duas possíves rotas, a /drinks e a /meals,
// a página nos trás informações sobre receitas e depende de sua rota para mostrar um devido tipo, no caso entre comidas e bebidas.

export default function Recipes() {
  // Aqui capturamos a rota que está sendo utilizada para se acessar a página.
  const currentPath = window.location.pathname;
  const isMealRoute = currentPath === '/meals';

  const [recipes, setRecipes] = useState([]);

  // Esse use effect faz um fetch assim que a página é montada de acordo com a rota utilizada e capturada no código sinalizado acima.
  useEffect(() => {
    const n = 12;
    if (isMealRoute) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ meals }) => {
          const treatedData = meals.slice(0, n);
          setRecipes(treatedData);
          console.log(recipes);
        });
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ drinks }) => {
          const treatedData = drinks.slice(0, n);
          setRecipes(treatedData);
          console.log(recipes);
        });
    }
  }, []);

  return (
    <main>
      {/* Aqui Fazemos uso do operador ternario e do componente ../components/Card criado para essa aplicação,
      dependendo de qual rota estiver sendo utilizada a página renderiza os 12
      primeiros itens da lista que de receitas que a devida API nos retorna.
      (O requisito pede que sejam renderizados apenas os primeiros 12 itens.)  */}
      { isMealRoute ? recipes.map((recipe, i) => (
        <Card
          key={ recipe.strMeal }
          name={ recipe.strMeal }
          imgSrc={ recipe.strMealThumb }
          SrcIndex={ i }
        />
      )) : recipes.map((recipe, i) => (
        <Card
          key={ recipe.strDrink }
          name={ recipe.strDrink }
          imgSrc={ recipe.strDrinkThumb }
          SrcIndex={ i }
        />
      ))}
    </main>
  );
}
