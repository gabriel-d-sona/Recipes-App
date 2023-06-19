import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function RecipeCard(props) {
  const {
    type,
    name,
    image,
    category,
    index,
    doneDate,
    tagName1,
    tagName2,
    nationality,
    handleClick,
    isAlcoholic,
    handleDetailsClick } = props;

  return (
    <div>
      { type === 'meal' ? (
        <>
          <h3
            role="presentation"
            onClick={ handleDetailsClick }
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h3>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${nationality} - ${category}` }
          </p>
          <img
            role="presentation"
            onClick={ handleDetailsClick }
            alt={ name }
            src={ image }
            width={ 250 }
            height={ 200 }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { doneDate }
          </p>
          <p
            data-testid={ `${index}-${tagName1}-horizontal-tag` }
          >
            {tagName1}
          </p>
          <p
            data-testid={ `${index}-${tagName2}-horizontal-tag` }
          >
            {tagName2}
          </p>
          <button
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleClick }
          >
            Compartilhar
          </button>
        </>
      )
        : (
          <>
            <h3
              role="presentation"
              onClick={ handleDetailsClick }
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </h3>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { isAlcoholic }
            </p>
            <img
              role="presentation"
              onClick={ handleDetailsClick }
              alt={ name }
              src={ image }
              width={ 250 }
              height={ 200 }
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { doneDate }
            </p>
            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleClick }
            >
              Compartilhar
            </button>
          </>
        )}
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  handleDetailsClick: PropTypes.func,
}.isRequired;
