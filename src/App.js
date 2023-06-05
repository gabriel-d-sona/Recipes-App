import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Recipes from './pages/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
