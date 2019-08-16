import React from "react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import { cleanup, wait } from "@testing-library/react";
import Dashboard from "..";
import axios from "axios";
afterEach(cleanup);
jest.mock("axios");
const mockData = {
  data: {
    data: {
      tasks: [
        {
          title: "Task 1",
          description: "Task 1",
          completed: false,
          _id: "test-1"
        }
      ]
    }
  }
};
describe("<Dashboard />", () => {
  axios.get.mockImplementation(() => Promise.resolve(mockData));

  const history = { location: { search: "" } };
  test("it renders", async () => {
    const testUser = { name: "Jon", email: "jon@jon.com" };
    const { container } = renderWithContextRouter(
      <Dashboard history={history} />,
      {
        route: "/dashboard?page=1&perPage=5",
        authValue: testUser
      }
    );

    await wait(() => expect(container).toMatchSnapshot());
  });
});