import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import SearchBarHandle from './SearchBarHandle';

function SearchBar() {
  const {
    setSearchBarType,
    setSearchBarString,
    renderSearch,
  } = useContext(RecipesContext);

  // const context = useContext(RecipesContext);
  // console.log(context);

  const history = useHistory();

  // const history = useContext(RecipesContext);
  // console.log(history);

  const handleRadioChange = ({ target }) => {
    setSearchBarType(target.value);
  };

  // console.log(setSearchBarType);

  const handleSearchChange = ({ target }) => {
    setSearchBarString(target.value);
  };

  // console.log(setSearchBarString);

  return (
    <form>
      <label htmlFor="ingredient-search-radio">
        <input
          onChange={ handleRadioChange }
          id="ingredient-search-radio"
          value="ingredient"
          name="radio-btn"
          data-testid="ingredient-search-radio"
          type="radio"
        />
        Ingrediente
      </label>

      <label htmlFor="name-search-radio">
        <input
          onChange={ handleRadioChange }
          name="radio-btn"
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="name"
        />
        Name
      </label>

      <label htmlFor="first-letter-search-radio">
        <input
          onChange={ handleRadioChange }
          name="radio-btn"
          value="first-letter"
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>

      <input
        onChange={ handleSearchChange }
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
      />

      <button
        onClick={ () => SearchBarHandle(renderSearch, history) }
        type="button"
        data-testid="exec-search-btn"
      >
        Executar
      </button>
    </form>
  );
}

export default SearchBar;
