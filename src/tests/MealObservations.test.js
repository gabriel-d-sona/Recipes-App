import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import meal from './mocks/requestApiMealById';
import drink from './mocks/requestApiDrinksById';

beforeEach(() => {
  const recipeId = useParams();
  if (recipeId.mealsId) {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(meal),
      }));
  } else {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(drink),
      }));
  }
});

afterEach(() => jest.restoreAllMocks);

describe('Testa a tela de detalhes de uma refeição', () => {
  it('Testa se foi feito um fetch para a API de refeição com o ID da receita atual', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    act(() => {
      history.push('/meals/52772');
    });
    // const isLoading = screen.queryByText(/carregando/i);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    // await waitFor(() => expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument());

    const title = await screen.findByRole('heading', { name: /teriyaki chicken casserole/i });
    expect(title).toBeInTheDocument();
  });
});
