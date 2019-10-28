import React from "react";
import { Box, Text } from "@chakra-ui/core";

function RequestCard(props) {
  return (
    <Box>
      <Text>{props.toCity}</Text>
    </Box>
  );
}

export default RequestCard;
