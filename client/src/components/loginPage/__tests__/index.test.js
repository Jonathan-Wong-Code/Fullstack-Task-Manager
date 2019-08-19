import React from "react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import LoginPage from "..";
import { fireEvent, wait } from "@testing-library/react";

jest.mock("axios");

describe("<LoginPage />", () => {
  test("it should log the user in successfully", async () => {
    const response = {
      data: {
        user: "test"
      }
    };
    axios.mockImplementation(() => Promise.resolve(response));
    const {
      getByLabelText,
      queryByTestId,
      getByTestId
    } = renderWithContextRouter(<LoginPage />, { route: "/login" });

    const email = getByLabelText(/email/i);
    const password = getByLabelText(/password/i);

    fireEvent.change(email, { target: { value: "jon@jon.com" } });
    fireEvent.change(password, { target: { value: "password123" } });

    fireEvent.submit(getByTestId("login-form"));
    await wait(() => expect(queryByTestId("login-error")).toBeNull());
  });

  test("it should not log the user in correctly", async () => {
    const error = new Error();
    error.response = {
      data: {
        message: "login error"
      }
    };
    axios.mockImplementation(() => Promise.reject(error));
    const {
      getByLabelText,
      queryByTestId,
      getByTestId
    } = renderWithContextRouter(<LoginPage />, { route: "/login" });

    const email = getByLabelText(/email/i);
    const password = getByLabelText(/password/i);

    fireEvent.change(email, { target: { value: "jon@jon.com" } });
    fireEvent.change(password, { target: { value: "password123" } });

    expect(email).toHaveValue("jon@jon.com");
    expect(password).toHaveValue("password123");

    fireEvent.submit(getByTestId("login-form"));
    await wait(() =>
      expect(getByTestId("login-error").textContent).toBe(
        error.response.data.message
      )
    );
  });
});
