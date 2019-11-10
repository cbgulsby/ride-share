import React, { useContext } from "react";
import { AuthContext } from "../components/Auth";
import firebase from "firebase/app";
import { Box, Text, Button } from "@chakra-ui/core";

function RequestCard(props) {
  const { currentUser } = useContext(AuthContext);

  function addOffer(requestID, currentUser) {
    firebase
      .firestore()
      .collection("requests")
      .doc(requestID)
      .update({
        offers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
      })
      .then(function() {
        console.log("id added successfully");
      })
      .catch(function(error) {
        console.log("problem");
      });
  }

  return (
    <Box
      mb={4}
      w="400px"
      h="100%"
      border="2px"
      borderColor="gray.200"
      borderRadius="10"
    >
      <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          User Info
        </Text>
        <Text p={1 / 2} isTruncated>
          Name: {props.firstName} {props.lastName}
        </Text>
        <Text p={1 / 2} as="em" isTruncated>
          Pickup Location
        </Text>
        <Text p={1 / 2} isTruncated>
          Address: {props.fromStreet}
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.fromCity}, {props.fromState} {props.fromZipCode}
        </Text>
      </Box>

      <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          Destination
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.toFacility}
        </Text>
        <Text p={1 / 2} isTruncated>
          Address: {props.toStreet}
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.toCity}, {props.toState} {props.toZipCode}
        </Text>
      </Box>

      <Box mb={2} ml={2}>
        {/* <Link to="/ride/make-offer"> */}
        <Button
          type="submit"
          p={1 / 2}
          variantColor="blue"
          onClick={() => addOffer(props.requestID, currentUser)}
        >
          <Text p={1 / 2} m={1}>
            Offer Ride
          </Text>
        </Button>
        {/* </Link> */}
      </Box>
    </Box>
  );
}

export default RequestCard;
