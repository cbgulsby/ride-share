import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/core";

function Home() {
  return (
    <Box p={5}>
      <h1>Home</h1>
      <Box>
        <Button as={Link} to="/ride/new" variantColor="blue">
          Request a Ride
        </Button>
      </Box>
      <Box>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </Box>
    </Box>
  );
}

export default Home;
