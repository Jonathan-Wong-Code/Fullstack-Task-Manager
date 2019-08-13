import React, { useContext, useReducer, createContext } from "react";
import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  SET_SAVED_TASKS,
  CLEAR_TASKS,
  TASK_ERROR
} from "./types";

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case EDIT_TASK:
      const editedTasks = state.tasks.map(task => {
        if (task._id === action.task._id) {
          return action.task;
        }
        return task;
      });
      return { ...state, tasks: editedTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter(task => task._id !== action.id);
      return { ...state, tasks: filteredTasks };
    case SET_SAVED_TASKS:
      return { ...state, tasks: action.tasks };
    case CLEAR_TASKS:
      return { ...state, tasks: [] };
    case TASK_ERROR:
      return { ...state, error: action.message };
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
