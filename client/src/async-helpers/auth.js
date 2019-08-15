import axios from "axios";
import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
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
    dispatch({ type: AUTH_ERROR, message: error.response.data.message });
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
    authDispatch({ type: AUTH_ERROR, message: error.response.data.message });
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
    dispatch({ type: AUTH_ERROR, message: error.response.data.message });
  }
}

export async function sendResetToken(email, dispatch) {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/forgotPassword",
      data: {
        email
      }
    });

    if (response.status === 200) {
      return "Password reset link sent!";
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response.data.message
    });
  }
}

export async function resetPassword(
  dispatch,
  password,
  confirmPassword,
  token
) {
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/users/resetPassword/${token}`,
      withCredentials: true,
      data: {
        password,
        confirmPassword
      }
    });

    if (response.data.user) {
      dispatch({
        type: LOGIN_SUCCESS,
        user: response.data.user
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response.data.message
    });
  }
}

export async function updatePassword(
  dispatch,
  password,
  updatedPassword,
  confirmUpdatedPassword
) {
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/users/updatePassword`,
      withCredentials: true,
      data: {
        password,
        updatedPassword,
        confirmUpdatedPassword
      }
    });
    if (response.status === 200) {
      return "Password updated!";
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response.data.message
    });
  }
}
