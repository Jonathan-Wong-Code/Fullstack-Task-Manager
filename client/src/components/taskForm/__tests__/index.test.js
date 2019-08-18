import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderContext } from "./../../../testUtils/testUtils";
import TaskForm from "..";
import axios from "axios";
import { fireEvent, wait, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("axios");

const history = createMemoryHistory();

const mockTask = {
  title: "Test task",
  description: "Test Descript",
  completed: false,
  _id: "test1234"
};

const response = {
  data: {
    data: {
      task: mockTask
    }
  }
};
afterEach(cleanup);

describe("<TaskForm>", () => {
  beforeEach(() => {
    history.push = jest.fn();
  });

  test("it should successfully create a new task", async () => {
    axios.mockImplementation(() => Promise.resolve(response));
    const { getByLabelText, getByTestId, queryByTestId } = renderContext(
      <Router history={history}>
        <TaskForm history={history} type="create" />,
      </Router>,
      {
        route: "/create"
      }
    );

    const title = getByLabelText(/title:/i);
    const description = getByLabelText(/description:/i);
    const completed = getByLabelText("completed?");

    fireEvent.change(title, { target: { value: mockTask.title } });
    fireEvent.change(description, { target: { value: mockTask.description } });
    fireEvent.click(completed);

    expect(title).toHaveValue(mockTask.title);
    expect(description).toHaveValue(mockTask.description);
    expect(completed).toHaveAttribute("value", "true");

    fireEvent.submit(getByTestId("task-form"));
    await wait(() => {
      expect(queryByTestId("task-form-error")).toBeNull();
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });

  test("it should throw an error if create task fails", async () => {
    const error = new Error();
    error.response = { data: { message: "failure" } };
    axios.mockImplementationOnce(() => Promise.reject(error));

    const { getByLabelText, getByTestId, container } = renderContext(
      <Router history={history}>
        <TaskForm history={history} type="create" />
      </Router>,
      {}
    );

    const title = getByLabelText(/title:/i);
    const description = getByLabelText(/description:/i);
    const completed = getByLabelText("completed?");

    fireEvent.change(title, { target: { value: mockTask.title } });
    fireEvent.change(description, {
      target: { value: mockTask.description }
    });
    fireEvent.click(completed);
    fireEvent.submit(getByTestId("task-form"));

    await wait(() => {
      expect(getByTestId("task-form-error")).toBeTruthy();
      expect(getByTestId("task-form-error").textContent).toBe("failure");
    });

    expect(history.push).not.toHaveBeenCalled();
  });
});
