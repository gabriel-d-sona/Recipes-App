import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [searchBarResults, setSearchBarResults] = useState([]);
  const [searchBarString, setSearchBarString] = useState('');
  const [searchBarType, setSearchBarType] = useState('');

  const history = useHistory();
  const renderSearch = useCallback(async () => {
    try {
      let BASE_URL = '';
      const { pathname } = history.location;
      console.log('cheguei aqui 1');
      if (pathname === '/meals') {
        console.log('cheguei aqui 2');
        BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
      } else {
        console.log('cheguei aqui 3');
        BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
      }

      if (searchBarString.length === 0) return;

      let url = '';
      if (searchBarType === 'ingredient') {
        console.log('cheguei aqui 4');
        url = `${BASE_URL}filter.php?i=${searchBarString}`;
      } else if (searchBarType === 'name') {
        console.log('cheguei aqui 5');
        url = `${BASE_URL}search.php?s=${searchBarString}`;
      } else if (searchBarType === 'first-letter') {
        console.log('cheguei aqui 6');
        if (searchBarString.length !== 1) {
          global.alert('Your search must have only 1 (one) character');
          return;
        }
        url = `${BASE_URL}search.php?f=${searchBarString}`;
      }

      const response = await fetch(url);
      console.log(response, 'cheguei aqui final 1');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const results = pathname === '/meals' ? data.meals : data.drinks;
      setSearchBarResults(results);
      console.log(setSearchBarResults(results), 'cheguei aqui final 2');
      return results;
    } catch (error) {
      console.error('An error occurred while fetching:', error);
    }
  }, [searchBarType, searchBarString, history.location]);

  const memoStore = useMemo(() => ({
    searchBarType,
    setSearchBarType,
    searchBarString,
    setSearchBarString,
    searchBarResults,
    setSearchBarResults,
    renderSearch,
  }), [searchBarType, searchBarString, searchBarResults, renderSearch]);

  return (
    <RecipesContext.Provider value={ memoStore }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
