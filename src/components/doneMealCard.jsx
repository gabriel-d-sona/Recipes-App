import React from 'react';
import PropTypes from 'prop-types';

export function DoneMealCard(props) {
  const {
    name,
    image,
    category,
    index,
    doneDate,
    tagName1,
    tagName2,
    nationality,
    handleClick,
    handleDetailsClick } = props;

  return (
    <div>
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
        { category }
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
        { `Essa receita foi feita em: ${doneDate}` }
      </p>
      <p
        data-testid={ `${index}-${tagName1}-horizontal-tag` }
      >
        { `${nationality} - ${tagName1} - ${tagName2}` }
      </p>
      <br />
      <button
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
    </div>
  );
}
DoneMealCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
