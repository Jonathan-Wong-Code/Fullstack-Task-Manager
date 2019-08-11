import React from "react";
import { Link } from "react-router-dom";
import { useTaskDispatch } from "./../context/task-context";
import { useState } from "react";
import { deleteTask, editTask } from "./../async-helpers/tasks";

function TaskListItem({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const taskDispatch = useTaskDispatch();

  const handleCheckChange = () => {
    setCompleted(!completed);
    editTask(
      {
        title: task.title,
        description: task.description,
        completed: !completed,
        _id: task._id
      },
      taskDispatch
    );
  };
  return (
    <div>
      <h3>Title: {task.title}</h3>
      <p>Description: {task.description}</p>
      <label htmlFor="completed">completed?</label>
      <input
        type="checkbox"
        id="completed"
        checked={completed}
        value={completed}
        onChange={handleCheckChange}
      />
      <Link to={`/edit/${task._id}`}>Edit Task</Link>
      <button onClick={() => deleteTask(task._id, taskDispatch)}>
        Delete Task
      </button>
    </div>
  );
}

export default TaskListItem;
