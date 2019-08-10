import axios from "axios";
import {
  SET_SAVED_TASKS,
  ADD_TASK,
  TASK_ERROR,
  DELETE_TASK
} from "./../context/types";

export async function fetchAllTasks(dispatch) {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/v1/tasks"
    });
    console.log(response);
    if (response.data.data.tasks) {
      dispatch({
        type: SET_SAVED_TASKS,
        tasks: response.data.data.tasks
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export async function createTask({ title, description, completed }, dispatch) {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/tasks",
      withCredentials: true,
      data: {
        title,
        description,
        completed
      }
    });

    dispatch({ type: ADD_TASK, task: response.data.data.task });
  } catch (error) {
    dispatch({ type: TASK_ERROR, message: error.response.data.message });
  }
}

export async function deleteTask(taskId, dispatch) {
  try {
    await axios({
      method: "DELETE",
      url: `http://localhost:3000/api/v1/tasks/${taskId}`,
      withCredentials: true
    });

    dispatch({ type: DELETE_TASK, id: taskId });
  } catch (error) {
    dispatch({ type: TASK_ERROR, message: error.response.data.message });
  }
}