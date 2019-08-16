import React from "react";
import UpdatePassword from "..";
import { render, fireEvent, wait } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("<updatePassword />", () => {
  test("it should render", () => {
    render(<UpdatePassword />);
  });

  test("should display an error when fields are missing", async () => {
    axios.patch.mockImplementation(() => Promise.reject(new Error()));

    const { getByTestId, queryByTestId, container } = render(
      <UpdatePassword />
    );

    expect(queryByTestId("update-pass-message")).toBeNull();
    fireEvent.submit(getByTestId("update-pass-form"));
    expect(container).toMatchSnapshot();
    await wait(() => {
      expect(getByTestId("update-pass-message")).toBeTruthy();
      expect(getByTestId("update-pass-message")).not.toBe("Password updated!");
    });
  });
});
