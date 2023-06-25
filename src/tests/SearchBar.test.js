import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const text1 = 'ingredient-search-radio';
  const text2 = 'name-search-radio';
  const text3 = 'first-letter-search-radio';
  const text4 = 'exec-search-btn';
  const text5 = 'first-letter';

  it('should render the SearchBar component', () => {
    const { getByTestId } = render(
      <Router>
        <SearchBar />
      </Router>,
    );

    const ingredientSearchRadio = getByTestId(text1);
    const nameSearchRadio = getByTestId(text2);
    const firstLetterSearchRadio = getByTestId(text3);
    const execSearchBtn = getByTestId(text4);

    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
  });

  it('should call setSearchBarType with the selected value when radio button is changed', () => {
    const setSearchBarType = jest.fn();
    const { getByTestId } = render(
      <Router>
        <SearchBar setSearchBarType={ setSearchBarType } />
      </Router>,
    );

    const ingredientSearchRadio = getByTestId(text1);
    const nameSearchRadio = getByTestId(text2);
    const firstLetterSearchRadio = getByTestId(text3);

    fireEvent.change(ingredientSearchRadio, { target: { value: 'ingredient' } });
    fireEvent.change(nameSearchRadio, { target: { value: 'name' } });
    fireEvent.change(firstLetterSearchRadio, { target: { value: text5 } });

    expect(setSearchBarType).toHaveBeenCalledTimes(3);
    expect(setSearchBarType).toHaveBeenCalledWith('ingredient');
    expect(setSearchBarType).toHaveBeenCalledWith('name');
    expect(setSearchBarType).toHaveBeenCalledWith(text5);
  });

  it('should call SearchBarHandle and history.push when the execute search button is clicked', () => {
    const renderSearch = jest.fn();
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(
      <Router>
        <SearchBar renderSearch={ renderSearch } history={ historyMock } />
      </Router>,
    );

    const execSearchBtn = getByTestId(text4);

    fireEvent.click(execSearchBtn);

    expect(renderSearch).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalled();
  });

  it('should associate the correct values to radio buttons', () => {
    const { getByTestId } = render(
      <Router>
        <SearchBar />
      </Router>,
    );

    const ingredientSearchRadio = getByTestId(text1);
    const nameSearchRadio = getByTestId(text2);
    const firstLetterSearchRadio = getByTestId(text3);

    expect(ingredientSearchRadio.value).toBe('ingredient');
    expect(nameSearchRadio.value).toBe('name');
    expect(firstLetterSearchRadio.value).toBe(text5);
  });

  it('should render the SearchBar component', () => {
    const { getByTestId } = render(
      <Router>
        <SearchBar />
      </Router>,
    );

    const ingredientSearchRadio = getByTestId('ingredient-search-radio');
    const nameSearchRadio = getByTestId('name-search-radio');
    const firstLetterSearchRadio = getByTestId('first-letter-search-radio');

    fireEvent.change(ingredientSearchRadio, { target: { value: 'ingredient' } });
    fireEvent.change(nameSearchRadio, { target: { value: 'name' } });
    fireEvent.change(firstLetterSearchRadio, { target: { value: 'first-letter' } });

    expect(ingredientSearchRadio.checked).toBe(false);
    expect(nameSearchRadio.checked).toBe(false);
    expect(firstLetterSearchRadio.checked).toBe(false);

    fireEvent.click(ingredientSearchRadio);
    expect(ingredientSearchRadio.checked).toBe(true);
    expect(nameSearchRadio.checked).toBe(false);
    expect(firstLetterSearchRadio.checked).toBe(false);

    fireEvent.click(nameSearchRadio);
    expect(ingredientSearchRadio.checked).toBe(false);
    expect(nameSearchRadio.checked).toBe(true);
    expect(firstLetterSearchRadio.checked).toBe(false);

    fireEvent.click(firstLetterSearchRadio);
    expect(ingredientSearchRadio.checked).toBe(false);
    expect(nameSearchRadio.checked).toBe(false);
    expect(firstLetterSearchRadio.checked).toBe(true);
  });
});
