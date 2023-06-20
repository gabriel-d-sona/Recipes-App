import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import UserProvider from '../../context/UserProvider';

const renderWithRouter = (component, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return ({
    ...render(
      <UserProvider>
        <Router history={ history }>{component}</Router>
      </UserProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
