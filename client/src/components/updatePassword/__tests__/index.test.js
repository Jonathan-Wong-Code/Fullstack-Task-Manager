import React from "react";
import UpdatePassword from "..";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios");
afterEach(cleanup);

describe("<updatePassword />", () => {
  test("it should render", () => {
    render(<UpdatePassword />);
  });

  test("should display an error from the API or when fields are missing", async () => {
    const error = new Error();
    error.response = { data: { message: "error" } };
    axios.mockImplementation(() => Promise.reject(error));

    const { getByTestId, queryByTestId, container } = render(
      <UpdatePassword />
    );

    expect(queryByTestId("update-pass-message")).toBeNull();
    fireEvent.submit(getByTestId("update-pass-form"));

    await wait(() => {
      expect(getByTestId("update-pass-message")).toBeTruthy();
      expect(getByTestId("update-pass-message").textContent).toBe("error");
      expect(container).toMatchSnapshot();
    });
  });

  test("should display a success message if password successfully updates", async () => {
    const response = {
      data: {
        message: "Password updated!"
      }
    };

    axios.mockImplementation(() => Promise.resolve(response));

    const { getByLabelText, getByTestId } = render(<UpdatePassword />);

    const currPass = getByLabelText(/Enter Current Password/i);
    const updatedPass = getByLabelText(/Enter New Password/i);
    const confirmUpdatedPass = getByLabelText(/Confirm Updated Password/i);

    fireEvent.change(currPass, {
      target: { value: "pass1234" }
    });
    fireEvent.change(updatedPass, {
      target: { value: "pass12345" }
    });

    fireEvent.change(confirmUpdatedPass, {
      target: { value: "pass12345" }
    });

    expect(currPass).toHaveValue("pass1234");
    expect(updatedPass).toHaveValue("pass12345");
    expect(confirmUpdatedPass).toHaveValue("pass12345");

    fireEvent.submit(getByTestId("update-pass-form"));
    await wait(() => {
      expect(getByTestId("update-pass-message")).toBeTruthy();
      expect(getByTestId("update-pass-message").textContent).toBe(
        "Password updated!"
      );
    });
  });
});
