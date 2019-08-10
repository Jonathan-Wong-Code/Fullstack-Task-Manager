import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT,
  LOGOUT_FAIL,
  CLEAR_TASKS
} from "./../context/types";

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

    if (response.data.user) {
      dispatch({
        type: LOGIN_SUCCESS,
        user: response.data.user
      });
    }
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
