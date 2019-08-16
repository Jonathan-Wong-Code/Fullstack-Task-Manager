import React from "react";
import EditTask from "..";
import { cleanup } from "@testing-library/react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import { act } from "react-dom/test-utils";
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

  test("it renders", async () => {
    const { container } = renderWithContextRouter(<EditTask match={match} />, {
      route: "/create"
    });

    expect(container).toMatchSnapshot();
  });
});
