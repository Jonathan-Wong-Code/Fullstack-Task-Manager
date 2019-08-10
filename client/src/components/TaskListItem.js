import React from "react";
import { Link } from "react-router-dom";

import { useTaskDispatch } from "./../context/task-context";
import { DELETE_TASK } from "./../context/types";

function TaskListItem({ task }) {
  const taskDispatch = useTaskDispatch();

  const updateUser = () => {};
  return (
    <div>
      <h3>Title: {task.title}</h3>
      <p>Description: {task.description}</p>
      <input
        type="checkbox"
        defaultChecked={task.completed}
        onChange={updateUser()}
      />
      <Link to={`/edit/${task.id}`}>Edit Task</Link>
      <button onClick={() => taskDispatch({ type: DELETE_TASK, id: task.id })}>
        Delete Task
      </button>
    </div>
  );
}

export default TaskListItem;
