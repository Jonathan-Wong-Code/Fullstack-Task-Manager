import React, {
  useContext,
  useReducer,
  createContext,
  useRef,
  useEffect
} from "react";
import { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, SIGNUP_SUCCESS } from "./types";
import axios from "axios";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case LOGOUT:
      return {
        ...state,
        user: action.user
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.message
      };

    default:
      return state;
  }
};

// CONTEXT
export function AuthProvider({ children, value }) {
  const [state, authDispatch] = useReducer(reducer, {
    user: null || value,
    login
  });

  async function login(dispatch, userDispatch, email, password, setState) {
    try {
      setState({ loading: true });
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/users/login",
        withCredentials: true,
        data: {
          email,
          password
        }
      });

      if (response.data.user) {
        dispatch({
          type: LOGIN_SUCCESS,
          user: response.data.user
        });
        userDispatch({
          type: LOGIN_SUCCESS,
          user: response.data.user
        });
      }
    } catch (error) {
      return error.response.data.message;
    } finally {
      setState({ loading: false });
    }
  }

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
  console.log(context);
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
  const safeDispatch = (...args) => {
    return mountedRef.current && dispatch(...args);
  };

  return safeDispatch;
}
