import React from "react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import { cleanup, wait } from "@testing-library/react";
import Dashboard from "..";
import axios from "axios";

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
        },
        {
          title: "Task 2",
          description: "Task 2",
          completed: true,
          _id: "test-12"
        }
      ]
    }
  }
};

const mockNumTasks = {
  data: {
    data: {
      complete: 1,
      incomplete: 1
    }
  }
};
afterEach(cleanup);

describe("<Dashboard />", () => {
  const history = { location: { search: "" } };
  test("it renders", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockNumTasks));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockNumTasks));

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
