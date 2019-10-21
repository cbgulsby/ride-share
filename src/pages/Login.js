import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { AuthContext } from "../auth/Auth";
import { Button, Box, FormControl, FormLabel, Input } from "@chakra-ui/core";

function Login({ history }) {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        console.log("hm");
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
    <Box p={4}>
      <h1>Log in</h1>
      <Box>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" type="email" placeholder="Email" />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </FormControl>
          <Box>
            <Button mt={4} variantColor="blue" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>

      <Box>
        <Link to="/signup">
          <Button mt={4} variantColor="blue" type="submit">
            Sign Up
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default withRouter(Login);
