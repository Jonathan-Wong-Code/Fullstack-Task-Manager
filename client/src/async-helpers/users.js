import axios from "axios";
import { UPDATE_USER } from "../context/types";

export async function updateUser(dispatch, data, setState) {
  try {
    setState({ loading: true });
    const response = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMe",
      withCredentials: true,
      data
    });

    dispatch({ type: UPDATE_USER, user: response.data.data.user });
    return response.data.message;
  } catch (error) {
    return error.response.data.message;
  } finally {
    setState({ loading: false });
  }
}
