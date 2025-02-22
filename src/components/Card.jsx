import React from 'react';
import PropTypes from 'prop-types';

export function Card(props) {
  const { name, imgSrc, SrcIndex, handleDetailsClick, id } = props;
  return (
    <div
      role="presentation"
      value={ id }
      onClick={ handleDetailsClick }
      data-testid={ `${SrcIndex}-recipe-card` }
    >
      <h3
        data-testid={ `${SrcIndex}-card-name` }
      >
        { name }
      </h3>
      <img
        alt={ name }
        src={ imgSrc }
        data-testid={ `${SrcIndex}-card-img` }
      />
      <br />
    </div>
  );
}
Card.propTypes = {
  name: PropTypes.string,
  imgSrc: PropTypes.string,
  SrcIndex: PropTypes.number,
}.isRequired;
