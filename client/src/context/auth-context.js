import React, {
  useContext,
  useReducer,
  createContext,
  useRef,
  useEffect,
  useCallback
} from "react";

import reducer from "./../reducers/authReducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// CONTEXT
export function AuthProvider({ children, value }) {
  const [state, authDispatch] = useReducer(reducer, {
    user: null || value
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("AuthStateProvider must use AuthStateContext");
  }
  return context;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
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
