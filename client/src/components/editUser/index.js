import React from "react";
import { useUserState } from "../../context/user-context";
import { useUserDispatch } from "../../context/user-context";
import useSafeDispatch from "../../hooks/useSafeDispatch";
import { updateUser } from "../../async-helpers/users";

function EditUser() {
  const { user } = useUserState();
  const userDispatch = useUserDispatch();

  const [{ name, email, message, loading }, setSafeState] = useSafeDispatch({
    name: user.name,
    email: user.email,
    loading: false,
    message: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { name, email };
    const message = await updateUser(userDispatch, user, setSafeState);
    setSafeState({ message, name: "", email: "" });
  };

  return (
    <section data-testid="edit-me-screen">
      <h2>Change your details</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="user-name">Name:</label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          value={name}
          onChange={e => setSafeState({ name: e.target.value })}
        />
        <label htmlFor="user-email">Email:</label>
        <input
          type="text"
          id="user-email"
          name="user-email"
          value={email}
          onChange={e => setSafeState({ email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {loading && <p>Updating info</p>}
    </section>
  );
}

export default EditUser;
