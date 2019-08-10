import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";

import { useTaskDispatch, useTaskState } from "./../context/task-context";
import { createTask } from "./../async-helpers/tasks";

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function TaskForm({ type, history, editedTask = null }) {
  const [{ title, description, completed }, setState] = useReducer(reducer, {
    description: editedTask ? editedTask.description : "",
    completed: editedTask ? editedTask.completed : false,
    title: editedTask ? editedTask.title : "",
    _id: editedTask ? editedTask._id : undefined
  });

  const taskDispatch = useTaskDispatch();
  const { error } = useTaskState();

  const handleSubmit = e => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed
    };
    if (type === "create") {
      createTask(task, taskDispatch);
    } else {
      // call edit task
    }
  };

  return (
    <>
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
      {error && <p>{error}</p>}
    </>
  );
}

export default withRouter(TaskForm);
