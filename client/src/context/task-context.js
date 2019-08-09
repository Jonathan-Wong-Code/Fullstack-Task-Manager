import React, { useContext, useReducer, createContext } from "react";
import { EDIT_TASK, ADD_TASK, DELETE_TASK } from "./types";
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
    case DELETE_TASK: {
      const filteredTasks = state.tasks.filter(task => task.id !== action.id);
      return { ...state, tasks: filteredTasks };
    }
    default:
      return state;
  }
};

export function TaskProvider({ children, initialTasks = [] }) {
  const [state, dispatch] = useReducer(reducer, {
    error: null,
    loading: false,
    tasks: initialTasks
  });
  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
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
