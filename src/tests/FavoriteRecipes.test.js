import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';

jest.mock('../components/Header', () => function MockedHeader() {
  return <div data-testid="mocked-header" />;
});
const storedRecipes = [
  {
    id: 1,
    type: 'meal',
    image: 'recipe1.jpg',
    name: 'Recipe 1',
    nationality: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    doneDate: '2023-06-15',
  },
  {
    id: 2,
    type: 'drink',
    image: 'recipe2.jpg',
    name: 'Recipe 2',
    nationality: 'American',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    doneDate: '2023-06-16',
  },
];
describe('Testando FavoriteRecipes Page', () => {
  it('Verifica se os botões All, Meals e Drinks estão presentes', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedRecipes));
    render(<FavoriteRecipes />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });
  test('filters recipes by drinks', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedRecipes));
    render(<FavoriteRecipes />);

    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });
    await waitFor(() => {
      const recipe1 = screen.queryByText('Recipe 1');
      const recipe2 = screen.queryByText('Recipe 2');
      expect(recipe1).toBeInTheDocument();
      expect(recipe2).toBeInTheDocument();
      userEvent.click(buttonDrinks);
      expect(recipe1).not.toBeInTheDocument();
      expect(recipe2).toBeInTheDocument();
    });
  });
  test('filters recipes by meals', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedRecipes));
    render(<FavoriteRecipes />);

    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    await waitFor(() => {
      const recipe1 = screen.queryByText('Recipe 1');
      const recipe2 = screen.queryByText('Recipe 2');
      expect(recipe1).toBeInTheDocument();
      expect(recipe2).toBeInTheDocument();
      userEvent.click(buttonMeals);
      expect(recipe2).not.toBeInTheDocument();
      expect(recipe1).toBeInTheDocument();
    });
  });
  it('Verifica se ao clicar no botão de desfavoritar da primeira receita essa mesma receita é removida da lista de receitas favoritas', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedRecipes));
    await act(async () => {
      render(<FavoriteRecipes />);
    });
    const favoriteButtons = screen.getAllByTestId(/-horizontal-favorite-btn/);
    const recipe1 = screen.queryByText('Recipe 1');
    expect(recipe1).toBeInTheDocument();
    const firstFavoriteButton = favoriteButtons[0];
    userEvent.click(firstFavoriteButton);
    expect(recipe1).not.toBeInTheDocument();
  });
});
