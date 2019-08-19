import axios from "axios";
import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
  CLEAR_TASKS,
  CLEAR_USER
} from "./../context/types";

export async function loginUser(
  authDispatch,
  userDispatch,
  email,
  password,
  setState
) {
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

    userDispatch({
      type: LOGIN_SUCCESS,
      user: response.data.user
    });
    authDispatch({ type: LOGIN_SUCCESS, user: true });
  } catch (error) {
    return error.response.data.message;
  } finally {
    setState({ loading: false });
  }
}

export async function logoutUser(authDispatch, taskDispatch, userDispatch) {
  try {
    await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/users/logout",
      withCredentials: true
    });

    userDispatch({ type: CLEAR_USER, user: null });
    taskDispatch({ type: CLEAR_TASKS });
    authDispatch({ type: LOGOUT, user: null });
  } catch (error) {
    authDispatch({ type: AUTH_ERROR, message: error.response.data.message });
  }
}

export async function signupUser(
  authDispatch,
  userDispatch,
  setState,
  { name, email, password, confirmPassword }
) {
  try {
    setState({ loading: true });
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
    userDispatch({ type: LOGIN_SUCCESS, user: response.data.user });
    authDispatch({ type: SIGNUP_SUCCESS, user: true });
  } catch (error) {
    return error.response.data.message;
  } finally {
    setState({ loading: false });
  }
}

export async function sendResetToken(email, setState) {
  try {
    setState({ loading: true });
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/forgotPassword",
      data: {
        email
      }
    });

    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error) {
    return error.response.data.message;
  } finally {
    setState({ loading: false });
  }
}

export async function resetPassword(
  authDispatch,
  userDispatch,
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
    userDispatch({
      type: LOGIN_SUCCESS,
      user: response.data.user
    });

    authDispatch({
      type: LOGIN_SUCCESS,
      user: true
    });
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updatePassword(
  password,
  updatedPassword,
  confirmUpdatedPassword,

  setState
) {
  try {
    setState({ loading: true });
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

    return response.data.message;
  } catch (error) {
    return error.response.data.message;
  } finally {
    setState({ loading: false });
  }
}
