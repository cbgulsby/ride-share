import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import app from "../base";
import { AuthContext } from '../auth/Auth';
import { Button } from '@chakra-ui/core';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <Button 
          mt={4}
          variantColor="teal"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Link to="/signup">
        <Button
          mt={4}
          variantColor="teal"
          type="submit"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default withRouter(Login);