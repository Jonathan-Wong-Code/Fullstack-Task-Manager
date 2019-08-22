import React from "react";
import TaskForm from "../taskForm";
import { FormSection, FormContainer, FormHeader } from "./../../themes/forms";

export default function CreateTask() {
  return (
    <FormSection>
      <FormContainer>
        <FormHeader>CreateTask</FormHeader>
        <TaskForm type="create" />
      </FormContainer>
    </FormSection>
  );
}
