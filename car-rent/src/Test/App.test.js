import React from "react";
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../views/AppRoutes';
import { Login } from '../views/Login/Login';
import userEvent from '@testing-library/user-event'


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
describe('Login Test', () => {

  it('login axios', () => {

    const fn = jest.fn();
    const history = createMemoryHistory();
    history.push('/');
    render(
      <AppRoutes history={history}>
        <Login />
      </AppRoutes>
    );

    const userNameInput = screen.getByTestId("UsernameTest");
    const passwordInput = screen.getByTestId("PasswordTest");
    const button = screen.getByTestId("testBTN");

    userEvent.type(userNameInput, "user");
    userEvent.type(passwordInput, "user");
    userEvent.click(button);

    expect(fn).toEqual({
      username: "user",
      password: "user"
    });
  });


})