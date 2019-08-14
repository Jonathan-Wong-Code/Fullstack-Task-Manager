import React, { useReducer } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth-context";
import { updateUser } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function EditUser() {
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();

  const [{ name, email, message }, setState] = useReducer(reducer, {
    name: user.name,
    email: user.email,
    message: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { name, email };
    const message = await updateUser(authDispatch, user);
    setState({ message, name: "", email: "" });
  };

  return (
    <section>
      <h2>Change your details</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="user-name">Name:</label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          defaultValue={name}
          onChange={e => setState({ name: e.target.value })}
        />
        <label htmlFor="user-email">Email:</label>
        <input
          type="text"
          id="user-email"
          name="user-email"
          defaultValue={email}
          onChange={e => setState({ email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}

export default EditUser;
