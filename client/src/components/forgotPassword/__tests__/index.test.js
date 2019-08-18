import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import axios from "axios";

import ForgotPassword from "..";
import { renderContext } from "./../../../testUtils/testUtils";

afterEach(cleanup);

jest.mock("axios");
describe("<ForgotPassword />", () => {
  test("it should render", () => {
    renderContext(<ForgotPassword />, {});
  });

  test("Should successfully request a password reset email", async () => {
    const response = {
      status: 200,
      data: {
        message: "Password reset link sent"
      }
    };
    const { getByLabelText, getByTestId, getByText } = renderContext(
      <ForgotPassword />,
      {}
    );
    axios.mockImplementation(() => Promise.resolve(response));
    const emailInput = getByLabelText(/enter email:/i);

    fireEvent.change(emailInput, { target: { value: "jon@jon.com" } });
    expect(emailInput).toHaveValue("jon@jon.com");
    fireEvent.submit(getByTestId("forgot-pass-form"));

    await wait(() => {
      expect(getByText(response.data.message)).toBeTruthy();
    });
  });

  test("Should return an error from the API", async () => {
    const error = new Error();
    error.response = {
      data: {
        message: "error"
      }
    };

    const { getByLabelText, getByTestId, getByText } = renderContext(
      <ForgotPassword />,
      {}
    );
    axios.mockImplementation(() => Promise.reject(error));
    const emailInput = getByLabelText(/enter email:/i);

    fireEvent.change(emailInput, { target: { value: "jon@jon.com" } });
    expect(emailInput).toHaveValue("jon@jon.com");
    fireEvent.submit(getByTestId("forgot-pass-form"));

    await wait(() => {
      expect(getByText(error.response.data.message)).toBeTruthy();
    });
  });
});
