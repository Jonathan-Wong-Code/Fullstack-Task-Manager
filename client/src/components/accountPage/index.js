import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "./../../context/auth-context";

function AccountPage() {
  const { user } = useAuthState();
  return (
    <section>
      <h1>Your account</h1>
      <div>
        <img src="https://www.fillmurray.com/200/300" alt="Your profile" />
      </div>
      <p>Name: {user.name}</p>
      <p>Email {user.email}</p>
      <Link to="/editMe">Edit details</Link>
      <Link to="/updatePassword">Edit password</Link>
    </section>
  );
}

export default AccountPage;
