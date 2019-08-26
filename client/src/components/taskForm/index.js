import React, { useReducer, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useTaskDispatch } from "../../context/task-context";
import { createTask, editTask } from "../../async-helpers/tasks";
import reducer from "../../reducers/stateReducer";

import {
  Form,
  Input,
  Label,
  TextArea,
  Button,
  CheckIcon,
  CheckboxContainer,
  CheckInput,
  CheckboxCaption,
  CheckIconInner
} from "./../../themes/forms";

function TaskForm({ type, history, editedTask, fetchError }) {
  const [{ title, description, completed, _id, error }, setState] = useReducer(
    reducer,
    {
      description: editedTask ? editedTask.description : "",
      completed: editedTask ? editedTask.completed : false,
      title: editedTask ? editedTask.title : "",
      _id: editedTask ? editedTask._id : undefined,
      error: ""
    }
  );

  const checkbox = useRef();

  const taskDispatch = useTaskDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed,
      _id
    };

    let message;

    if (type === "create") {
      message = await createTask(task, taskDispatch);
    } else {
      message = await editTask(task, taskDispatch);
    }

    if (message) {
      return setState({ error: message });
    }
    history.push("/dashboard");
  };

  return (
    <>
      <Form onSubmit={handleSubmit} data-testid="task-form">
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={e => setState({ title: e.target.value })}
        />
        <Label htmlFor="description">Description:</Label>
        <TextArea
          type="text"
          id="description"
          rows="10"
          cols="50"
          value={description}
          onChange={e => setState({ description: e.target.value })}
        />
        <CheckboxContainer>
          <CheckInput
            id="completed"
            type="checkbox"
            data-testid='completed-checkbox'
            checked={completed}
            value={completed}
            ref={checkbox}
            onChange={e => {
              setState({ completed: checkbox.current.checked });
            }}
          />
          <CheckboxCaption>completed:</CheckboxCaption>
          <CheckIcon htmlFor={`completed`} className={`check-box-outer`}>
            <CheckIconInner
              className={`check-box-inner`}
              completed={completed}
            ></CheckIconInner>
          </CheckIcon>
        </CheckboxContainer>
        {error && <p data-testid="task-form-error">{error}</p>}
        {fetchError && <p>{fetchError}</p>}
        <Button> {type === "create" ? "Create" : "Edit"}</Button>
      </Form>
    </>
  );
}

export default withRouter(TaskForm);
