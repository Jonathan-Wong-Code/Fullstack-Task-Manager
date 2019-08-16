import React from "react";
import useGetNumTasks from "./../useGetNumTasks";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";

jest.mock("axios;");

const mockNumTasks = {
  data: {
    data: {
      complete: 1,
      incomplete: 1
    }
  }
};

test("Should return the number of complete and incomplete tasks", async () => {
  axios.mockImplementation(() => Promise.resolve(mockNumTasks));

  const { result, waitForNextUpdate } = renderHook(() => useGetNumTasks());
  await waitForNextUpdate();
  expect(result.current).toEqual(mockNumTasks.data.data);
});
