import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router";
import { Link as RRLink } from "react-router-dom";
import firebase from "firebase/app";
import { AuthContext } from "../components/Auth";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Heading
} from "@chakra-ui/core";
import Layout from "../components/Layout";

function Login({ history }) {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
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
    <Layout>
      <Heading as="h1" size="xl" mb={4}>
        Login
      </Heading>
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

      <Link as={RRLink} to="/signup" d="block" mt={4}>
        Don't have an account? Sign up now.
      </Link>
    </Layout>
  );
}

export default Login;
