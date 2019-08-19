import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import axios from "axios";
import { renderContext } from "./../../../testUtils/testUtils";
import ResetPassword from "..";
jest.mock("axios");
afterEach(cleanup);

describe("<ResetPassword />", () => {
  const match = {
    params: {
      token: "token123"
    }
  };
  test("It should successfully reset the password", async () => {
    const response = {
      data: {
        user: "test user"
      }
    };

    axios.mockImplementation(() => Promise.resolve(response));
    const { getByTestId, queryByTestId, getByLabelText } = renderContext(
      <ResetPassword match={match} />,
      { route: "/resetPassword" }
    );

    const password = getByLabelText(/enter password/i);
    const confirmPassword = getByLabelText(/confirm password/i);

    fireEvent.change(password, { target: { value: "pass123" } });
    fireEvent.change(confirmPassword, { target: { value: "pass123" } });

    expect(password).toHaveValue("pass123");
    expect(confirmPassword).toHaveValue("pass123");

    fireEvent.submit(getByTestId("reset-password-form"));

    await wait(() => {
      expect(queryByTestId("reset-password-error")).toBeNull();
    });
  });

  test("It should return an error from the API", async () => {
    const error = new Error();
    error.response = {
      data: {
        message: "reset error"
      }
    };

    axios.mockImplementation(() => Promise.reject(error));
    const { getByTestId, getByLabelText } = renderContext(
      <ResetPassword match={match} />,
      { route: "/resetPassword" }
    );

    const password = getByLabelText(/enter password/i);
    const confirmPassword = getByLabelText(/confirm password/i);

    fireEvent.change(password, { target: { value: "pass123" } });
    fireEvent.change(confirmPassword, { target: { value: "pass1234" } });

    fireEvent.submit(getByTestId("reset-password-form"));

    await wait(() => {
      expect(getByTestId("reset-password-error").textContent).toBe(
        "reset error"
      );
    });
  });
});
