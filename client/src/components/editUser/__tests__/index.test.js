import React from "react";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { renderContext } from "./../../../testUtils/testUtils";
import EditUser from "..";
jest.mock("axios");
afterEach(cleanup);

describe("<EditUser>", () => {
  test("it should successfully update the user's details", async () => {
    const response = {
      data: {
        message: "Details updated!",
        data: {
          user: {
            name: "jon",
            email: "jon@jon.com"
          }
        }
      }
    };

    axios.mockImplementation(() => Promise.resolve(response));
    const { getByLabelText, queryByTestId, getByTestId } = renderContext(
      <EditUser />,
      {
        route: "/editMe",
        userValue: { name: "test user", email: "test@test.com" }
      }
    );
    expect(queryByTestId("edit-me-message")).toBeNull();
    const name = getByLabelText("Name:");
    const email = getByLabelText("Email:");

    fireEvent.change(name, { target: { value: "jon" } });
    fireEvent.change(email, { target: { value: "jon@jon.com" } });

    expect(name).toHaveValue("jon");
    expect(email).toHaveValue("jon@jon.com");

    fireEvent.submit(getByTestId("edit-me-form"));
    await wait(() => {
      expect(getByTestId("edit-me-message").textContent).toBe(
        "Details updated!"
      );
    });
  });

  test("should return an error from the API", async () => {
    const error = new Error();
    error.response = {
      data: {
        message: "edit error"
      }
    };

    axios.mockImplementation(() => Promise.reject(error));
    const { getByLabelText, queryByTestId, getByTestId } = renderContext(
      <EditUser />,
      {
        route: "/editMe",
        userValue: { name: "test user", email: "test@test.com" }
      }
    );
    expect(queryByTestId("edit-me-message")).toBeNull();
    const name = getByLabelText("Name:");
    const email = getByLabelText("Email:");

    fireEvent.change(name, { target: { value: "jon" } });
    fireEvent.change(email, { target: { value: "jon@jon.com" } });

    fireEvent.submit(getByTestId("edit-me-form"));
    await wait(() => {
      expect(getByTestId("edit-me-message").textContent).toBe("edit error");
    });
  });
});
