import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, cleanup } from "@testing-library/react";
import Header from "..";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import { logoutUser } from "./../../../async-helpers/auth";

jest.mock("./../../../async-helpers/auth");

afterEach(cleanup);
describe("<Header />", () => {
  test("Should logout a logged in user", () => {
    const { getByText, queryByText } = renderWithContextRouter(<Header />, {
      route: "/",
      authValue: true,
      userValue: {
        name: "jon",
        email: "jon@jon.com"
      }
    });

    expect(getByText(/dashboard/i)).toBeTruthy();
    expect(getByText(/create/i)).toBeTruthy();
    expect(queryByText(/signup/i)).toBeNull();
    expect(queryByText(/login/i)).toBeNull();
    expect(getByText(/my account/i)).toBeTruthy();
    expect(getByText(/logout/i)).toBeTruthy();

    fireEvent.click(getByText(/logout/i));
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });

  test("Should show the header for a not logged in user", () => {
    const { getByText, queryByText } = renderWithContextRouter(<Header />, {
      route: "/",
      authValue: false,
      userValue: {}
    });

    expect(queryByText(/dashboard/i)).toBeNull();
    expect(queryByText(/create/i)).toBeNull();
    expect(getByText(/signup/i)).toBeTruthy();
    expect(getByText(/login/i)).toBeTruthy();
    expect(queryByText(/my account/i)).toBeNull();
    expect(queryByText(/logout/i)).toBeNull();

    expect(queryByText(/logout/i)).toBeNull();
  });
});
