import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../async-helpers/auth";
import { useAuthDispatch } from "../../context/auth-context";
import { useUserDispatch } from "../../context/user-context";
import {
  Form,
  Label,
  Input,
  Button,
  FormContainer,
  FormSection,
  FormHeader
} from "../../themes/forms";
import useSafeDispatch from "../../hooks/useSafeDispatch";

function LoginPage() {
  const [{ email, password, error, loading }, setSafeState] = useSafeDispatch({
    email: "",
    password: "",
    error: "",
    loading: ""
  });

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await loginUser(
      authDispatch,
      userDispatch,
      email,
      password,
      setSafeState
    );
    if (message) {
      setSafeState({ error: message });
    }
  };

  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Login</FormHeader>
        <Form action="" onSubmit={handleSubmit} data-testid="login-form">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
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
          {error && !loading && <p data-testid="login-error">{error}</p>}
          {loading && <p>Logging in...</p>}
          <Link to="/forgotPassword">Forgot your password?</Link>

          <Button type="submit">Login</Button>
        </Form>
      </FormContainer>
    </FormSection>
  );
}

export default LoginPage;
