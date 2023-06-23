import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('verify', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('testa se a página de drinks é renderizada e o devido fetch é feito corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<Recipes />, ['/drinks']);

    const GG = await screen.findByText(/gg/i);
    expect(GG).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    console.log(history.location.pathname);
  });

  test('testa se a página de meals é renderizada e o devido fetch é feito corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<Recipes />, ['/meals']);

    const corba = await screen.findByText(/Corba/i);
    expect(corba).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    console.log(history.location.pathname);
  });

  test('testa se os filtros da tela de meals funcionam corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    renderWithRouter(<Recipes />, ['/meals']);

    const beefFilter = await screen.findByTestId('Beef-category-filter');
    expect(beefFilter).toBeInTheDocument();
    userEvent.click(beefFilter);

    // jest.clearAllMocks();

    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(meals),
    // });

    const beefAndMustard = await screen.findByText(/beef and mustard pie/i);
    expect(beefAndMustard).toBeInTheDocument();
  });
});
