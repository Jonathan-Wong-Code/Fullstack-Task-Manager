import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  renderWithContextRouter,
  renderContext
} from "./../../../testUtils/testUtils";
import TaskForm from "..";
import axios from "axios";
import { fireEvent, wait } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
history.push = jest.fn();
jest.mock("axios");

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

describe("<TaskForm>", () => {
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
});
