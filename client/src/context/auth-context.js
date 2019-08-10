import React, { useContext, useReducer, createContext } from "react";
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_TASKS
} from "./types";
import axios from "axios";

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

// "MIDDLEWARE"
export async function loginUser(dispatch, email, password) {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      withCredentials: true,
      data: {
        email,
        password
      }
    });

    dispatch({ type: LOGIN_SUCCESS, user: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, message: error.response.data.message });
  }
}

export async function logoutUser(authDispatch, taskDispatch) {
  try {
    await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/users/logout",
      withCredentials: true
    });

    authDispatch({ type: LOGOUT, user: null });
    taskDispatch({ type: CLEAR_TASKS });
  } catch (error) {
    authDispatch({ type: LOGOUT_FAIL, message: error.response.data.message });
  }
}

export async function signupUser(
  dispatch,
  { name, email, password, confirmPassword }
) {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/signup",
      withCredentials: true,
      data: {
        name,
        email,
        password,
        confirmPassword
      }
    });
    const user = response.data.user;
    dispatch({ type: SIGNUP_SUCCESS, user });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, message: error.response.data.message });
  }
}
