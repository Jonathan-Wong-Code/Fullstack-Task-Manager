import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import Signup from "..";
import axios from "axios";

jest.mock("axios");

describe("<Signup>", () => {
  test("it should successfully sign a user up", async () => {
    const response = {
      data: {
        user: "Test user"
      }
    };
    axios.mockImplementation(() => Promise.resolve(response));
    const {
      getByLabelText,
      queryByTestId,
      getByTestId
    } = renderWithContextRouter(<Signup />, {
      route: "/signup"
    });

    const name = getByLabelText("Name");
    const email = getByLabelText("Email");
    const password = getByLabelText("Password");
    const confirmPassword = getByLabelText("Confirm Password");

    fireEvent.change(name, { target: { value: "name" } });
    fireEvent.change(email, { target: { value: "email" } });
    fireEvent.change(confirmPassword, { target: { value: "confirmPassword" } });
    fireEvent.change(password, { target: { value: "password" } });

    expect(name).toHaveValue("name");
    expect(email).toHaveValue("email");
    expect(password).toHaveValue("password");
    expect(confirmPassword).toHaveValue("confirmPassword");

    fireEvent.submit(getByTestId("signup-form"));
    await wait(() => {
      expect(queryByTestId("signup-error")).toBeNull();
    });
  });

  test("it should return an error", async () => {
    const error = new Error();
    error.response = {
      data: {
        message: "signup error"
      }
    };
    axios.mockImplementation(() => Promise.reject(error));
    const { getByLabelText, getByTestId } = renderWithContextRouter(
      <Signup />,
      {
        route: "/signup"
      }
    );

    const name = getByLabelText("Name");
    const email = getByLabelText("Email");
    const password = getByLabelText("Password");
    const confirmPassword = getByLabelText("Confirm Password");

    fireEvent.change(name, { target: { value: "name" } });
    fireEvent.change(email, { target: { value: "email" } });
    fireEvent.change(confirmPassword, {
      target: { value: "confirmPassword" }
    });
    fireEvent.change(password, { target: { value: "password" } });

    fireEvent.submit(getByTestId("signup-form"));
    await wait(() => {
      expect(getByTestId("signup-error").textContent).toBe("signup error");
    });
  });
});
