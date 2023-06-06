import React from 'react';
import PropTypes from 'prop-types';

export function FiltterButton(props) {
  const { category, handleClick } = props;

  return (
    <div>
      <label>
        { category }
        <input
          type="checkbox"
          data-testid={ `${category}-category-filter` }
          onClick={ handleClick }
        />
      </label>
    </div>
  );
}

FiltterButton.propTypes = {
  category: PropTypes.string,
}.isRequired;
