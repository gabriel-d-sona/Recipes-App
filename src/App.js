import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/drinks/:drinksId" component={ RecipeDetails } />
        <Route path="/meals/:mealsId" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
