import React from "react";
import { Heading } from "@chakra-ui/core";
import Layout from "../components/Layout";

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
        <Button as={Link} to="/ride/offer" variantColor="red">
          Offer a Ride
        </Button>
      </Box>
      <Box>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </Box>
    </Box>
  );
}

export default Home;
