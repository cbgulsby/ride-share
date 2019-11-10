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
            fromCity={request.pickupInfo.fromCity}
            fromState={request.pickupInfo.fromState}
            fromZipCode={request.pickupInfo.fromZipCode}
            fromFacility={request.pickupInfo.fromFacility}
            fromStreet={request.pickupInfo.fromStreet}
            toCity={request.dropOffInfo.toCity}
            toState={request.dropOffInfo.toState}
            toZipCode={request.dropOffInfo.toZipCode}
            toFacility={request.dropOffInfo.toFacility}
            toStreet={request.dropOffInfo.toStreet}
            firstName={request.user.firstName}
            lastName={request.user.lastName}
            date={request.date}
            requestID={request.requestID}
            key={request.requestID}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RideRequestList;
