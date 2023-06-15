import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/drinks/:drinksId" component={ RecipeDetails } />
      <Route path="/meals/:mealsId" component={ RecipeDetails } />
      <Route exact path="/" component={ Login } />
    </Switch>

  );
}

export default App;
