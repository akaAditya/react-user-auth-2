import { render, screen } from "@testing-library/react";
import UserAuth from "./UserAuth";
import { test } from "@jest/globals";
import userEvent from "@testing-library/user-event";

describe("UserAuth Component", () => {
  test("renders test login", () => {
    //Arrange
    render(<UserAuth />);
    //ACT

    //Assert
    const userAuthTest = screen.getByText("Email");
    expect(userAuthTest).toBeInTheDocument();
  });

  test('test Post Expenses', ()=>{
    render(<UserAuth />);
    const getSignUp = screen.getByRole('button');
    userEvent.click(getSignUp);

    const outputElement = screen.getByText('Sign Up', {exact: false});
    expect(outputElement).toBeInTheDocument()
})

test('test Sign up', ()=>{
    render(<UserAuth />);
    const getSignUp = screen.getByRole('button');
    userEvent.click(getSignUp);

    const outputElement = screen.getByText('Sign Up', {exact: false});
    expect(outputElement).toBeInTheDocument()
})

test('test Sign in', ()=>{
    render(<UserAuth />);
    const getSignIn = screen.getByRole('button');
    userEvent.click(getSignIn);

    const outputElement = screen.getByText('Sign In', {exact: false});
    expect(outputElement).toBeInTheDocument()
})

test('test forgot password', ()=>{
    render(<UserAuth />);
    const getForgotPsw = screen.getByRole('button');
    userEvent.click(getForgotPsw);

    const outputElement = screen.getByText('Forgot Password', {exact: false});
    expect(outputElement).toBeInTheDocument()
})
});
