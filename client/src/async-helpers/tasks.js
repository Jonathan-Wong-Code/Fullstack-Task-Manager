import axios from "axios";
import {
  SET_SAVED_TASKS,
  ADD_TASK,
  TASK_ERROR,
  DELETE_TASK,
  EDIT_TASK
} from "./../context/types";

export async function fetchAllTasks(
  dispatch,
  limit,
  page,
  completed,
  sort,
  query,
  setState
) {
  const setCompletedQuery = completed => {
    if (completed) {
      return `&completed=${completed}`;
    }
    return "";
  };

  const setSortQuery = sort => {
    if (sort) {
      return `&sort=${sort}`;
    }
    return "";
  };

  const setSearchQuery = sort => {
    if (sort) {
      return `&title=${query}`;
    }
    return "";
  };

  try {
    setState({ loading: true });
    const response = await axios.get(
      `http://localhost:3000/api/v1/tasks?limit=${limit}&page=${page}
      ${setCompletedQuery(completed)}${setSortQuery(sort)}${setSearchQuery(
        query
      )}`,
      {
        withCredentials: true
      }
    );
    if (response.data.data.tasks) {
      dispatch({
        type: SET_SAVED_TASKS,
        tasks: response.data.data.tasks
      });
    }
  } catch (error) {
    return setState({ error: error.response.data.message });
  } finally {
    setState({ loading: false });
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
    return error.response.data.message;
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

export async function editTask(
  { title, description, completed, _id },
  dispatch
) {
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/tasks/${_id}`,
      withCredentials: true,
      data: {
        title,
        description,
        completed
      }
    });
    dispatch({ type: EDIT_TASK, task: response.data.data.task });
  } catch (error) {
    return error.response.data.message;
  }
}
