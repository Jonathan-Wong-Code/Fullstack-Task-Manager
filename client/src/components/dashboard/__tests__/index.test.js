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
          _id: "test-2"
        },
        {
          title: "Task 3",
          description: "Task 3",
          completed: true,
          _id: "test-3"
        },
        {
          title: "Task 4",
          description: "Task 4",
          completed: true,
          _id: "test-4"
        },
        {
          title: "Task 5",
          description: "Task 5",
          completed: true,
          _id: "test-5"
        },
        {
          title: "Task 6",
          description: "Task 6",
          completed: false,
          _id: "test-6"
        },
        {
          title: "Task 7",
          description: "Task 7",
          completed: false,
          _id: "test-7"
        },
        {
          title: "Task 8",
          description: "Task 8",
          completed: false,
          _id: "test-8"
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

describe("<Dashboard /> Unit Test", () => {
  const history = { location: { search: "" } };

  test("it renders", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockNumTasks));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockNumTasks));

    const testUser = { name: "Jon", email: "jon@jon.com" };
    const { getByTestId } = renderWithContextRouter(
      <Dashboard history={history} />,
      {
        route: "/dashboard?page=1&perPage=5",
        authValue: testUser
      }
    );

    await wait(() => {
      expect(getByTestId("task-item-1")).toBeTruthy();
      expect(getByTestId("task-item-2")).toBeTruthy();
      expect(getByTestId("task-item-3")).toBeTruthy();
      expect(getByTestId("task-item-4")).toBeTruthy();
      expect(getByTestId("task-item-5")).toBeTruthy();
      expect(getByTestId("task-item-6")).toBeTruthy();
      expect(getByTestId("task-item-7")).toBeTruthy();
      expect(getByTestId("task-item-0")).toBeTruthy();
    });
  });

  test("it returns an error", async () => {
    const error = new Error();
    error.response = { data: { message: "fetch tasks error" } };
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const testUser = { name: "Jon", email: "jon@jon.com" };
    const { getByTestId, queryByTestId } = renderWithContextRouter(
      <Dashboard history={history} />,
      {
        route: "/dashboard?page=1&perPage=5",
        authValue: testUser
      }
    );

    await wait(() => {
      expect(queryByTestId("task-item-1")).toBeNull();
      expect(queryByTestId("task-item-2")).toBeNull();
      expect(queryByTestId("task-item-3")).toBeNull();
      expect(queryByTestId("task-item-4")).toBeNull();
      expect(queryByTestId("task-item-5")).toBeNull();
      expect(queryByTestId("task-item-6")).toBeNull();
      expect(queryByTestId("task-item-7")).toBeNull();
      expect(queryByTestId("task-item-0")).toBeNull();
      expect(getByTestId("dashboard-error").textContent).toBe(
        "fetch tasks error"
      );
    });
  });
});
