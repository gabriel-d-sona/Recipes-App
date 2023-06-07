import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../components/Card';
import Header from '../components/Header';
import { FiltterButton } from '../components/FilterButton';

// Explicação da aplicação requisito 19: a página de receitas tem duas possíves rotas, a /drinks e a /meals,
// a página nos trás informações sobre receitas e depende de sua rota para mostrar um devido tipo, no caso entre comidas e bebidas.

export default function Recipes() {
  // Aqui capturamos a rota que está sendo utilizada para se acessar a página.
  const history = useHistory();
  const currentPath = history.location.pathname;
  const isMealRoute = currentPath === '/meals';

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const MN2 = 5;

  // Esse use effect faz um fetch assim que a página é montada de acordo com a rota utilizada e capturada no código sinalizado acima.
  useEffect(() => {
    const MN1 = 12;
    if (isMealRoute) {
      // Primeiro fetch de meals feito para renderização dos cards de comida na tela
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ meals }) => {
          const treatedDataForRecipes = meals.slice(0, MN1);
          setRecipes(treatedDataForRecipes);
        });
      // Segundo fetch de meals feito em um endpoint diferente para renderização dos botões de filtragem de catégoria
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then(({ meals }) => {
          setCategories(meals);
          console.log(meals);
        });
    } else {
      // Primeiro fetch de drinks feito para renderização dos cards de bebida na tela
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ drinks }) => {
          const treatedDataForRecipes = drinks.slice(0, MN1);
          setRecipes(treatedDataForRecipes);
          // console.log(drinks);
        });
      // Segundo fetch de drinks feito em um endpoint diferente para renderização dos botões de filtragem de catégoria
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then(({ drinks }) => {
          setCategories(drinks);
          console.log(drinks);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        { categories
          .slice(0, MN2)
          .map(({ strCategory }, i) => (
            <FiltterButton
              key={ i }
              category={ strCategory }
            />
          )) }
        {/* Aqui Fazemos uso do operador ternario e do componente ../components/Card criado para essa aplicação,
      dependendo de qual rota estiver sendo utilizada a página renderiza os 12
      primeiros itens da lista de receitas que a devida API nos retorna.
    (O requisito pede que sejam renderizados apenas os primeiros 12 itens)  */}
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
