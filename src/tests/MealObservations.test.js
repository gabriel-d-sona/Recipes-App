import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772') {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(meals),
        });
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007') {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(drinks),
        });
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(drinks),
        });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(meals),
        });
      }
    });
});

afterEach(() => jest.restoreAllMocks);

describe('Testa a tela de detalhes de uma refeição', () => {
  it('Testa se foi feito um fetch para a API de refeição com o ID da receita atual', async () => {
    renderWithRouter(<App />, ['/meals/52772']);

    // const isLoading = screen.queryByText(/carregando/i);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    // await waitFor(() => expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument());

    const title = await screen.findByRole('heading', { name: /teriyaki chicken casserole/i });
    expect(title).toBeInTheDocument();
  });
});
