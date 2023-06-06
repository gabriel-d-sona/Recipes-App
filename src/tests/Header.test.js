import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';

describe('Header component', () => {
  test('renders profile icon', () => {
    render(<Header />, { wrapper: MemoryRouter });
    const profileIcon = screen.getByAltText('Perfil');
    expect(profileIcon).toBeInTheDocument();
  });
  const seachIcon = 'Ícone de pesquisa';
  test('renders search icon when on meals or drinks page', () => {
    render(<Header />, { wrapper: MemoryRouter });
    const searchIcon = screen.getByAltText(seachIcon);
    expect(searchIcon).toBeInTheDocument();
  });

  test('does not render search icon when not on meals or drinks page', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );
    const searchIcon = screen.queryByAltText(seachIcon);
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('toggles search bar when search icon is clicked', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );
    const searchIcon = screen.getByAltText(seachIcon);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    fireEvent.click(searchIcon);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('displays correct page title', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const pageTitle = 'page-title';
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Meals');

    history.push('/drinks');
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Drinks');

    history.push('/profile');
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Profile');

    history.push('/done-recipes');
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Done Recipes');

    history.push('/favorite-recipes');
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Favorite Recipes');
  });
});

test('redirects to profile page when profile icon is clicked', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );

  const profileIcon = screen.getByAltText('Perfil');
  fireEvent.click(profileIcon);

  expect(history.location.pathname).toBe('/profile');
});

test('displays correct page title for done-recipes path', () => {
  const history = createMemoryHistory();
  history.push('/done-recipes');
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const pagTitle = screen.getByTestId(pageTitle);
  expect(pagTitle).toHaveTextContent('Done Recipes');
});

test('displays correct page title for favorite-recipes path', () => {
  const history = createMemoryHistory();
  history.push('/favorite-recipes');
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const pagTitle = screen.getByTestId(pageTitle);
  expect(pagTitle).toHaveTextContent('Favorite Recipes');
});
