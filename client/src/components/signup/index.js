import React from "react";
import { useAuthDispatch } from "../../context/auth-context";
import { useUserDispatch } from "../../context/user-context";
import useSafeDispatch from "./../../hooks/useSafeDispatch";
import { signupUser } from "../../async-helpers/auth";
import {
  Form,
  Input,
  Label,
  Button,
  FormHeader,
  FormContainer,
  FormSection
} from "../../themes/forms";

function Signup() {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const [
    { name, email, password, confirmPassword, error, loading },
    setSafeState
  ] = useSafeDispatch({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await signupUser(authDispatch, userDispatch, setSafeState, {
      name,
      email,
      password,
      confirmPassword
    });

    if (error) {
      setSafeState({ error });
    }
  };

  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Signup</FormHeader>
        <Form action="" onSubmit={handleSubmit} data-testid="signup-form">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={e => setSafeState({ name: e.target.value })}
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={e => setSafeState({ email: e.target.value })}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="text"
            id="password"
            value={password}
            onChange={e => setSafeState({ password: e.target.value })}
            required
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setSafeState({ confirmPassword: e.target.value })}
            required
          />
          <Button type="submit">Signup</Button>
        </Form>
        {error && <p data-testid="signup-error">{error}</p>}
        {loading && <p>Signing up...</p>}
      </FormContainer>
    </FormSection>
  );
}
export default Signup;
