import React from "react";
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../views/AppRoutes';
import { Login } from '../views/Login/Login';


test('Render Login Component', () => {
  const history = createMemoryHistory();
  history.push('/')
  render(
    <AppRoutes history={history}>
      <Login />
    </AppRoutes>
  );

  //screenen megkeresni szöveget
  const loginTest = screen.getByText(/Easiest/);
  expect(loginTest).toBeInTheDocument();
});

//AXIOS TEST
