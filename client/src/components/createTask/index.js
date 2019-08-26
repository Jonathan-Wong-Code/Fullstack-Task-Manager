import React from "react";
import TaskForm from "../taskForm";
import { FormSection, FormContainer, FormHeader } from "./../../themes/forms";

function CreateTask() {
  return (
    <FormSection>
      <FormContainer>
        <FormHeader>CreateTask</FormHeader>
        <TaskForm type="create" />
      </FormContainer>
    </FormSection>
  );
}

export default CreateTask;
