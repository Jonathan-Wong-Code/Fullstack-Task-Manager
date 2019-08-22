import React, { useReducer } from "react";
import { useAuthDispatch } from "../../context/auth-context";
import { useUserDispatch } from "../../context/user-context";

import { resetPassword } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";
import {
  FormSection,
  FormContainer,
  FormHeader,
  Form,
  Input,
  Button,
  Label
} from "../../themes/forms";

function ResetPassword({ match }) {
  const [{ password, confirmPassword, error }, setState] = useReducer(reducer, {
    password: "",
    confirmPassword: "",
    error: ""
  });

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await resetPassword(
      authDispatch,
      userDispatch,
      password,
      confirmPassword,
      match.params.token
    );

    if (message) {
      setState({
        password: "",
        confirmPassword: "",
        error: message
      });
    }
  };

  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Reset password</FormHeader>
        <Form
          action=""
          onSubmit={handleSubmit}
          data-testid="reset-password-form"
        >
          <Label htmlFor="reset-password">Enter Password</Label>
          <Input
            type="text"
            id="reset-password"
            value={password}
            onChange={e => setState({ password: e.target.value })}
          />
          <Label htmlFor="reset-confirm-password">Confirm Password</Label>
          <Input
            type="text"
            id="reset-confirm-password"
            value={confirmPassword}
            onChange={e => setState({ confirmPassword: e.target.value })}
          />
          {error && <p data-testid="reset-password-error">{error}</p>}
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </FormSection>
  );
}

export default ResetPassword;
