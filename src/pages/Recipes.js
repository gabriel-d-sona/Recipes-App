import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const MN1 = 12;
  const MN2 = 5;

  // Esse use effect faz um fetch assim que a página é montada de acordo com a rota utilizada e capturada no código sinalizado acima.
  useEffect(() => {
    if (isMealRoute) {
      // Primeiro fetch de meals feito para renderização dos cards de comida na tela
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ meals }) => {
          console.log(meals);
          const treatedDataForRecipes = meals.slice(0, MN1);
          setRecipes(treatedDataForRecipes);
          setFilteredRecipes(treatedDataForRecipes);
        });
      // Segundo fetch de meals feito em um endpoint diferente para renderização dos botões de filtragem de catégoria
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then(({ meals }) => {
          setCategories(meals);
        });
    } else {
      // Primeiro fetch de drinks feito para renderização dos cards de bebida na tela
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ drinks }) => {
          console.log(drinks);
          const treatedDataForRecipes = drinks.slice(0, MN1);
          setRecipes(treatedDataForRecipes);
          setFilteredRecipes(treatedDataForRecipes);
        });
      // Segundo fetch de drinks feito em um endpoint diferente para renderização dos botões de filtragem de catégoria
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then(({ drinks }) => {
          setCategories(drinks);
        });
    }
  }, []);

  // Utilizamos essa função para a manipulação das receitas renderizadas na tela, a lógica abaixo é feita para que
  // ao ativar um dos botões de filtro da tela, sejam renderizadas as 12 primeiras receitas da categoria cujo são os nomes dos botões.
  // E por fim fazer com que se caso o botão clicado esteja sendo desmarcado seja renderizada a end point inicial que é renderizada quando dando o primeiro load na tela.
  function handleClick({ target }) {
    const { value, checked } = target;
    console.log(value);
    // verifica se a rota é /meals e se o botão com quem o usuario está interajindo está marcado.
    if (isMealRoute && checked) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then(({ meals }) => {
          setRecipes(meals.slice(0, MN1));
        });
    } if (!isMealRoute && checked) {
      // verifica se a rota é /drinks e se o botão com quem o usuario está interajindo está marcado.
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then(({ drinks }) => {
          setRecipes(drinks.slice(0, MN1));
        });
    }
    if (!checked) {
      // verifica se o botão com quem o usuario está interajindo está desmarcado.
      console.log('teste');
      setRecipes(filteredRecipes);
      console.log(filteredRecipes);
    }
  }

  function handleDetailsClick(id) {
    console.log(id);
    if (isMealRoute) {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  }

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
              handleClick={ (e) => handleClick(e) }
            />
          )) }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setRecipes(filteredRecipes) }
        >
          All
        </button>
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
            id={ recipe.idMeal }
            handleDetailsClick={ () => handleDetailsClick(recipe.idMeal) }
          />
        )) : recipes.map((recipe, i) => (
          <Card
            key={ recipe.strDrink }
            name={ recipe.strDrink }
            imgSrc={ recipe.strDrinkThumb }
            SrcIndex={ i }
            id={ recipe.idDrink }
            handleDetailsClick={ () => handleDetailsClick(recipe.idDrink) }
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
