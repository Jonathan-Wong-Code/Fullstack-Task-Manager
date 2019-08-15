import axios from "axios";
import { UPDATE_USER } from "../context/types";

export async function updateUser(dispatch, { name, email }) {
  try {
    const response = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMe",
      withCredentials: true,
      data: {
        name,
        email
      }
    });

    dispatch({ type: UPDATE_USER, user: response.data.data.user });
    return "Updated your details";
  } catch (error) {
    return error.response.data.message;
  }
}
