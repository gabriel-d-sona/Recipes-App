import React from 'react';
import PropTypes from 'prop-types';

export function FiltterButton(props) {
  const { category, handleClick } = props;

  return (
    <div>
      <label>
        <button
          type="checkbox"
          value={ category }
          data-testid={ `${category}-category-filter` }
          onClick={ handleClick }
        >
          { category }
        </button>
      </label>
    </div>
  );
}

FiltterButton.propTypes = {
  category: PropTypes.string,
}.isRequired;
