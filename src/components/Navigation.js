import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "./Auth";
import { Box, Flex, Button, Heading } from "@chakra-ui/core";
import { COLORS, MAX_WIDTH } from "../utils/constants";

function Navigation({ history }) {
  const { signOut, currentUser } = React.useContext(AuthContext);

  function signOutAndNavigate() {
    signOut().then(() => history.push("/"));
  }

  return (
    <Box px={[8, 12, 16, 24]} py={6}>
      <Flex
        align={["start", "start", "center"]}
        justify="space-between"
        direction={["column", "column", "row"]}
        w="100%"
        maxW={MAX_WIDTH}
        mx="auto"
      >
        <Link to="/">
          <Heading as="h1" size="md" display="block" mb={[4, 4, 0]}>
            RideShare
          </Heading>
        </Link>

        {currentUser && (
          <Flex
            align="center"
            justify="start"
            direction={["column-reverse", "column-reverse", "row"]}
          >
            <Button
              as={Link}
              to="/ride/new"
              variant="outline"
              variantColor={COLORS.primary}
              display={["none", "none", "inline-flex"]}
              mr={2}
            >
              Request Ride
            </Button>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              variantColor={COLORS.primary}
              display={["none", "none", "inline-flex"]}
              mr={2}
            >
              Home
            </Button>
            <Button
              display={["none", "none", "inline-flex"]}
              mr={2}
              onClick={signOutAndNavigate}
            >
              Sign Out
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default withRouter(Navigation);
