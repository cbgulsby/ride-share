import React from "react";
import RequestCard from "../components/RequestCard";
import { Box, Text } from "@chakra-ui/core";

function RideRequestList({ requestList }) {
  return (
    <Box>
      <Text>Requests Found:</Text>
      <Box>
        {requestList.map(request => (
          <RequestCard
            toCity={request.toCity}
            toState={request.toState}
            toFacility={request.toFacility}
            toStreet={request.toStreet}
            userId={request.userId}
            key={request.key}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RideRequestList;
