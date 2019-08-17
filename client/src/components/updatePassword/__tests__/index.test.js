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

  test("should display an error when fields are missing", async () => {
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
      expect(getByTestId("update-pass-message")).toHaveTextContent("error");
      expect(container).toMatchSnapshot();
    });
  });
});
