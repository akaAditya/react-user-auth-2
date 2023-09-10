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

//Async 
test("render signUp credentials", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "#1",
          email: 'test@jest.com',
          password: "123@123#",
          confirmPassword: "123@123#",
        },
      ],
    });
    render(<UserAuth />);
    const listsignUpElements = await screen.findAllByRole('form');
    expect(listsignUpElements).not.toHaveLength(0);
  });

  test("render signIn right credentials", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "#1",
          email: 'test@jest.com',
          password: "123@123#",
        },
      ],
    });
    render(<UserAuth />);
    const listsignInElements = await screen.findAllByRole('form');
    expect(listsignInElements).not.toHaveLength(0);
  });

  test("render signIn wrong credentials", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "#1",
          email: 'test1#jest.com',
          password: "@123123#",
        },
      ],
    });
    render(<UserAuth />);
    const listsignInWithWrongElements = await screen.findAllByRole('form');
    expect(listsignInWithWrongElements).not.toHaveLength(0);
  });

  test("render signIn wrong credentials", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "#1",
          email: 'testjest@__.com_',
          password: "abc!232@",
        },
      ],
    });
    render(<UserAuth />);
    const listsignInWithWrongElements = await screen.findAllByRole('form');
    expect(listsignInWithWrongElements).not.toHaveLength(0);
  });
});
