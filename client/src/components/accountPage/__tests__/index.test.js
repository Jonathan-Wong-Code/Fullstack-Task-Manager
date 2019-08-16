import React from "react";
import "@testing-library/jest-dom/extend-expect";
import AccountPage from "..";
import { cleanup } from "@testing-library/react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";

jest.mock("axios");

afterEach(cleanup);
const testUser = { name: "testname", email: "test@test.com" };

describe("<AccountPage />", () => {
  test("it should render", () => {
    renderWithContextRouter(<AccountPage />, {
      route: "/myAccount",
      authValue: testUser
    });
  });

  test("it renders with proper context values", () => {
    const { getByTestId } = renderWithContextRouter(<AccountPage />, {
      route: "/myAccount",
      authValue: testUser
    });
    expect(getByTestId("account-name")).toHaveTextContent(testUser.name);
    expect(getByTestId("account-email")).toHaveTextContent(testUser.email);
  });
});
