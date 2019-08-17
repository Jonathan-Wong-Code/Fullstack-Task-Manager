import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TaskListItem from "..";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import axios from "axios";
import { fireEvent, wait, act } from "@testing-library/react";
import { editTask, deleteTask } from "./../../../async-helpers/tasks";

jest.mock("./../../../async-helpers/tasks");
jest.mock("axios");

editTask.mockImplementation(() => jest.fn());
deleteTask.mockImplementation(() => jest.fn());

const task = {
  title: "test task",
  description: "test task description",
  completed: false,
  _id: "test123"
};

describe("<TaskListItem />,", () => {
  test("it renders", () => {
    renderWithContextRouter(<TaskListItem task={task} />, {
      route: "/edit/test123"
    });
  });

  test("Should return an edited task when the completed button is clicked", async () => {
    const response = {
      data: {
        data: {
          task
        }
      }
    };
    const { getByLabelText, container } = renderWithContextRouter(
      <TaskListItem task={task} editTask={editTask} />,
      {
        route: "/edit/test123"
      }
    );

    axios.mockImplementation(() => Promise.resolve(response));

    const checkbox = getByLabelText("completed?");
    expect(checkbox).toHaveAttribute("value", "false");
    fireEvent.click(checkbox);

    await wait(() => {
      expect(checkbox).toHaveAttribute("value", "true");
      expect(editTask).toHaveBeenCalledTimes(1);
    });
  });

  test("Should call deleteTask when delete button clicked", () => {
    const { getByText } = renderWithContextRouter(
      <TaskListItem task={task} deleteTask={deleteTask} />,
      {
        route: "/edit/test123"
      }
    );

    fireEvent.click(getByText(/delete task/i));
    expect(deleteTask).toHaveBeenCalledTimes(1);
  });
});
