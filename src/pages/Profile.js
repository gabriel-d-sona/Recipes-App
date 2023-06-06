import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Profile() {
  const history = useHistory();

  const logoutBtn = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div>
      <p data-testid="profile-email">email</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutBtn }
      >
        Logout
      </button>
    </div>
  );
}
