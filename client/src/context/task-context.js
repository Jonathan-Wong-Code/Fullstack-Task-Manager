import React, { useContext, useReducer, createContext } from "react";
import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  SET_SAVED_TASKS,
  CLEAR_TASKS
} from "./types";
import axios from "axios";

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case EDIT_TASK:
      const editedTasks = state.tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task;
        }
        return task;
      });
      return { ...state, tasks: editedTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter(task => task.id !== action.id);
      return { ...state, tasks: filteredTasks };
    case SET_SAVED_TASKS:
      return { ...state, tasks: action.tasks };
    case CLEAR_TASKS:
      return { ...state, tasks: [] };
    default:
      return state;
  }
};

export function TaskProvider({ children }) {
  const [state, taskDispatch] = useReducer(reducer, {
    error: null,
    loading: false,
    tasks: []
  });

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={taskDispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const context = useContext(TaskStateContext);
  if (!context) {
    throw new Error("TaskStateContext Provider must use TaskStateContext");
  }
  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);
  if (!context) {
    throw new Error(
      "TaskDispatchContext Provider must use TaskDispatchContext"
    );
  }
  return context;
}

export async function fetchAllTasks(dispatch) {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/v1/tasks"
    });
    dispatch({
      type: SET_SAVED_TASKS,
      tasks: response.data.data.tasks
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}
