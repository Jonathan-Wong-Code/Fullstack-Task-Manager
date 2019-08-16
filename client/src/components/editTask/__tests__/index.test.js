import React from "react";
import EditTask from "..";
import { cleanup, wait } from "@testing-library/react";
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

  test("it renders", async () => {
    const testUser = { name: "Jon", email: "jon@jon.com" };

    const { container } = renderWithContextRouter(<EditTask match={match} />, {
      route: "/create",
      authValue: testUser
    });

    await wait(() => expect(container).toMatchSnapshot());
  });
});
