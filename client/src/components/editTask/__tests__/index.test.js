import React from "react";
import EditTask from "..";
import { cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import axios from "axios";

jest.mock("axios");

afterEach(cleanup);

const mockData = {
  data: {
    data: {
      task: {
        completed: true,
        title: "task 1",
        description: "task 1"
      }
    }
  }
};

describe("<EditTask />", () => {
  axios.get.mockImplementation(() => Promise.resolve(mockData));

  const match = { params: { id: "test123" } };

  test("it renders with pre-existing task", async () => {
    const testUser = { name: "Jon", email: "jon@jon.com" };
    const { getByLabelText } = renderWithContextRouter(
      <EditTask match={match} />,
      {
        route: "/create",
        authValue: testUser
      }
    );

    //Integration with TaskForm
    await wait(() => {
      const title = getByLabelText("Title:");
      const description = getByLabelText("Description:");
      const completed = getByLabelText("completed:");
      expect(title).toHaveValue("task 1");
      expect(description).toHaveValue("task 1");
      expect(completed).toHaveAttribute("value", "true");
    });
  });
});
