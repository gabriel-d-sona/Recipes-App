import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();

  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  const doneBtn = () => {
    history.push('/done-recipes');
  };

  const favoriteBtn = () => {
    history.push('/favorite-recipes');
  };

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { email } = user;

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ doneBtn }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ favoriteBtn }
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
      <Footer />
    </div>
  );
}
