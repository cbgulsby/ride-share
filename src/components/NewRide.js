import React from "react";
import app from "../base";
import { AuthContext } from "../auth/Auth";
import { Box } from "@chakra-ui/core";
import NewRideForm from "./NewRideForm";

function NewRide({ history }) {
  const { currentUser } = React.useContext(AuthContext);

  function onCreateRide(values) {
    app
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
