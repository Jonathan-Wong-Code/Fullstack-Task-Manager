import React from "react";
import useFetchTask from "./../useFetchTask";
import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { TaskProvider } from "./../../context/task-context";
jest.mock("axios");
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

const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;

test("Should return a task", async () => {
  axios.get.mockImplementation(() => Promise.resolve(mockData));

  const { result, waitForNextUpdate } = renderHook(() => useFetchTask(), {
    wrapper
  });

  await waitForNextUpdate();
  console.log(result.current);
  expect(result.current).toEqual(mockData.data.data.task);
});
