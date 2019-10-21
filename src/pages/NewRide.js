import React from "react";
import firebase from "firebase/app";
import { AuthContext } from "../components/Auth";
import { Box } from "@chakra-ui/core";
import NewRideForm from "../components/NewRideForm";

function NewRide({ history }) {
  const { currentUser } = React.useContext(AuthContext);

  function onCreateRide(values) {
    firebase
      .firestore()
      .collection("requests")
      .add({
        ...values,
        date: new Date(),
        userId: currentUser.uid
      })
      .then(() => {
        history.push("/");
      });
  }

  return (
    <Box p={5}>
      <NewRideForm onCreateRide={onCreateRide} />
    </Box>
  );
}

export default NewRide;
