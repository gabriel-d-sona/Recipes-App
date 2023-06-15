import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
<<<<<<< HEAD
import RecipeDetails from './pages/RecipeDetails';
=======
import Recipes from './pages/Recipes';
>>>>>>> 03cc776377830f0af1ea1496eb99f1f2fcc61d54

function App() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
=======
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route exact path="/" component={ Login } />
>>>>>>> 03cc776377830f0af1ea1496eb99f1f2fcc61d54
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/drinks/:drinksId" component={ RecipeDetails } />
        <Route path="/meals/:mealsId" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
