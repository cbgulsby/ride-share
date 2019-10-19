import React from "react";
import app from "../base";
import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/core";

const Home = () => {
  return (
    <Box p={5}>
      <h1>Home</h1>
      <Box>
        <Button as={Link} to="/ride/new" variantColor="blue">
          Request a Ride
        </Button>
      </Box>
      <Box>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </Box>
    </Box>
  );
};

export default Home;
