import { createContext } from 'react';

const RecipesContext = createContext({ searchBarType: '',
  setSearchBarType: () => {},
  searchBarString: '',
  setSearchBarString: () => {},
  searchResults: [],
  setSearchResults: () => {},
  renderSearch: () => {},
  currentRecipeDetails: {},
  setCurrentRecipeDetails: () => {},
  recipes: [],
  setRecipes: () => {} });

export default RecipesContext;
