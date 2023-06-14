import React from 'react';
import PropTypes from 'prop-types';

export function DoneDrinkCard(props) {
  const { name, image, index, doneDate, handleClick, handleDetailsClick } = props;

  return (
    <div>
      <h3
        role="presentation"
        onClick={ handleDetailsClick }
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </h3>
      <img
        role="presentation"
        onClick={ handleDetailsClick }
        alt={ name }
        src={ image }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { `Essa receita foi feita em: ${doneDate}` }
      </p>
      <br />
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleClick }
      >
        Compartilhar
      </button>
    </div>
  );
}
DoneDrinkCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
