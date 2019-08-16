import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "./../../context/auth-context";

function AccountPage() {
  const { user } = useAuthState();
  return (
    <section data-testid="account-page-screen">
      <h1>Your account</h1>
      <div>
        <img src="https://www.fillmurray.com/200/300" alt="Your profile" />
      </div>
      <p data-testid="account-name">Name: {user.name}</p>
      <p data-testid="account-email">Email: {user.email}</p>
      <Link to="/editMe">Edit details</Link>
      <Link to="/updatePassword">Edit password</Link>
    </section>
  );
}

export default AccountPage;
