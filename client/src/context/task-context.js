import React, {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import reducer from "./../reducers/taskReducer";
export const TaskStateContext = createContext();
export const TaskDispatchContext = createContext();

export function TaskProvider({ children, value }) {
  const [state, taskDispatch] = useReducer(reducer, {
    tasks: value || [] // for testing
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
  const state = useContext(TaskStateContext);
  if (!state) {
    throw new Error("TaskStateContext Provider must use TaskStateContext");
  }
  return state;
}

export function useTaskDispatch() {
  const dispatch = useContext(TaskDispatchContext);
  if (!dispatch) {
    throw new Error(
      "TaskDispatchContext Provider must use TaskDispatchContext"
    );
  }

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeDispatch = useCallback(
    (...args) => {
      return mountedRef.current && dispatch(...args);
    },
    [dispatch]
  );

  return safeDispatch;
}
