import React, { useContext, useReducer, createContext } from "react";
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "./types";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        user: action.user
      };
    case LOGOUT: {
      return {
        user: null
      };
    }

    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case SIGNUP_FAIL: {
      return {
        ...state,
        error: action.message
      };
    }
    default:
      return state;
  }
};

// CONTEXT
export function AuthProvider({ children }) {
  const [state, authDispatch] = useReducer(reducer, {
    user: null
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
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("AuthDispatchProvider must use AuthDispatchContext");
  }
  return context;
}
