import React, { useReducer } from "react";
import uuid from "uuid";
import { useTaskDispatch } from "./../context/task-context";

import { ADD_TASK, EDIT_TASK } from "./../context/types";
import { withRouter } from "react-router-dom";
const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function TaskForm({ type, history, editedTask = null }) {
  const [{ title, description, completed }, setState] = useReducer(reducer, {
    description: editedTask ? editedTask.description : "",
    completed: editedTask ? editedTask.completed : false,
    title: editedTask ? editedTask.title : ""
  });

  const dispatch = useTaskDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed,
      id: editedTask ? editedTask.id : uuid()
    };
    const dispatchType = type === "create" ? ADD_TASK : EDIT_TASK;
    dispatch({
      type: dispatchType,
      task
    });

    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={e => setState({ title: e.target.value })}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        type="text"
        id="description"
        rows="10"
        cols="50"
        value={description}
        onChange={e => setState({ description: e.target.value })}
      />
      <label htmlFor="completed">completed?</label>
      <input
        id="completed"
        type="checkbox"
        checked={completed}
        value={completed}
        onChange={e => setState({ completed: e.target.value })}
      />
      <button> {type === "create" ? "Create" : "Edit"}</button>
    </form>
  );
}

export default withRouter(TaskForm);
