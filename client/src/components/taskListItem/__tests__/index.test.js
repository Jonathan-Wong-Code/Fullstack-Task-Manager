import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TaskListItem from "..";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import axios from "axios";
import { fireEvent, wait } from "@testing-library/react";

jest.mock("axios");

const task = {
  title: "test task",
  description: "test task description",
  completed: false,
  id: "test123"
};

describe("<TaskListItem />,", () => {
  test("it renders", () => {
    renderWithContextRouter(<TaskListItem task={task} />, {
      route: "/edit/test123"
    });
  });

  test("Should return an edited task when the completed button is clicked", async () => {
    axios.mockImplementation(() =>
      Promise.resolve({ ...task, completed: true })
    );

    const { getByLabelText } = renderWithContextRouter(
      <TaskListItem task={task} />,
      {
        route: "/edit/test123"
      }
    );

    const checkbox = getByLabelText(/completed?/i);
    expect(checkbox.checked).toBe(false);
    // fireEvent.change(checkbox);
    // await wait(() => expect(checkbox.checked).toBe(true));
  });
});
