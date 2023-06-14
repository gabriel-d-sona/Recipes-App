import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import filterArrays from '../services/helpers/filterArrays';
import requestApi from '../services/helpers/requestApi';
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css';

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

  // const six = 6;

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

      <h4>Recomendações:</h4>

      {/* <Carousel>
        <Carousel.Item>
          <div className="carousel-container">
            <div data-testid="0-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[0].strDrinkThumb }
                alt={ drinks[0].strDrink }
              />
              <h4
                data-testid="0-recommendation-card"
              >
                {drinks[0].strDrink}

              </h4>
            </div>
            <div data-testid="1-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[1].strDrinkThumb }
                alt={ drinks[1].strDrink }
              />
              <h4
                data-testid="1-recommendation-card"
              >
                {drinks[1].strDrink}

              </h4>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-container">
            <div data-testid="2-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[2].strDrinkThumb }
                alt={ drinks[2].strDrink }
              />
              <h4
                data-testid="2-recommendation-card"
              >
                {drinks[2].strDrink}

              </h4>
            </div>
            <div data-testid="3-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[3].strDrinkThumb }
                alt={ drinks[3].strDrink }
              />
              <h4
                data-testid="3-recommendation-card"
              >
                {drinks[3].strDrink}

              </h4>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-container">
            <div data-testid="4-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[4].strDrinkThumb }
                alt={ drinks[4].strDrink }
              />
              <h4
                data-testid="4-recommendation-card"
              >
                {drinks[4].strDrink}

              </h4>
            </div>
            <div data-testid="5-recommendation-card">
              <img
              // className="img-carousel"
                src={ drinks[5].strDrinkThumb }
                alt={ drinks[5].strDrink }
              />
              <h4
                data-testid="5-recommendation-card"
              >
                {drinks[5].strDrink}

              </h4>
            </div>
          </div>
        </Carousel.Item>
      </Carousel> */}
      {/* {
        drinks.map((drink, index) => (index < six ? (
          <div key={ index } data-testid={ `${index}-recommendation-card` }>
            <Carousel>
              <Carousel.Item>
                <div className="carousel-container">
                  <img
                    className="img-carousel"
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        ) : undefined))
      } */}
    </div>
  );
}

MealObservations.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default MealObservations;
