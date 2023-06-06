import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';

describe('Profile component', () => {
  test('renderiza o email', () => {
    const user = {
      email: 'example@example.com',
    };
    localStorage.setItem('user', JSON.stringify(user));

    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const emailElement = getByTestId('profile-email');
    expect(emailElement.textContent).toBe(user.email);
  });

  test('redireciona para a pagina Done Recipes ao clicar no botão Done Recipes', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneBtn = getByTestId('profile-done-btn');
    fireEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('redireciona para a pagina de Favorite Recipes ao clicar em Favorite Recipes', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteBtn = getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('limpa o localStorage e redireciona para o App ao clicar no Logout', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: 'example@example.com' }));

    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const logoutBtn = getByTestId('profile-logout-btn');
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('user')).toBe(null);
    expect(history.location.pathname).toBe('/');
  });
});
