import React from "react";
import { Box, Text, Button } from "@chakra-ui/core";

function RequestCard(props) {
  return (
    <Box
      mb={2}
      w="100%"
      h="100%"
      border="2px"
      borderColor="gray.200"
      borderRadius="10"
    >
      <Text p={1 / 2}>{props.userId}</Text>
      <Text p={1 / 2}>{props.toCity}</Text>
      <Text p={1 / 2}>{props.toState}</Text>
      <Text p={1 / 2}>{props.toFacility}</Text>
      <Button p={1 / 2}>Offer Ride</Button>
    </Box>
  );
}

export default RequestCard;
