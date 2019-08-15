import React, { useReducer, useRef } from "react";
import { withRouter } from "react-router-dom";

import { useTaskDispatch, useTaskState } from "../../context/task-context";
import { createTask, editTask } from "../../async-helpers/tasks";
import reducer from "../../reducers/stateReducer";

function TaskForm({ type, history, editedTask }) {
  const [{ title, description, completed, _id }, setState] = useReducer(
    reducer,
    {
      description: editedTask ? editedTask.description : "",
      completed: editedTask ? editedTask.completed : false,
      title: editedTask ? editedTask.title : "",
      _id: editedTask ? editedTask._id : undefined
    }
  );

  const checkbox = useRef();

  const taskDispatch = useTaskDispatch();
  const { error } = useTaskState();

  const handleSubmit = async e => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed,
      _id
    };

    let success;
    if (type === "create") {
      success = await createTask(task, taskDispatch);
    } else {
      success = await editTask(task, taskDispatch);
    }
    if (success) {
      history.push("/dashboard");
    }
  };
  console.log(completed);
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
          ref={checkbox}
          onChange={e => {
            setState({ completed: checkbox.current.checked });
          }}
        />
        <button> {type === "create" ? "Create" : "Edit"}</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}

export default withRouter(TaskForm);
