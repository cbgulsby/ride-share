import React, { useState } from "react";
import firebase from "firebase/app";
import { Box } from "@chakra-ui/core";
import OfferRideForm from "../components/OfferRideForm";
import RideRequestList from "../components/RideRequestList";

function OfferRide({ history }) {
  const [requestList, setRequestList] = useState([]);

  function onOfferRide(values) {
    firebase
      .firestore()
      .collection("requests")
      .where("toCity", "==", values.toCity)
      .get()
      .then(function(querySnapshot) {
        const tempRequestList = [];
        querySnapshot.forEach(function(doc) {
          const { toCity, toState, toFacility, toStreet, userId } = doc.data();
          tempRequestList.push({
            toCity: toCity,
            toState: toState,
            toFacility: toFacility,
            toStreet: toStreet,
            userId: userId,
            key: doc.id
          });
        });
        console.log(tempRequestList);
        setRequestList(tempRequestList);
      });
  }

  return (
    <Box display="flex" alignItems="flex-start" justifyItems="space-between">
      <Box p={10}>
        <OfferRideForm onOfferRide={onOfferRide} />
      </Box>
      <Box p={10}>
        <RideRequestList requestList={requestList} />
      </Box>
    </Box>
  );
}

export default OfferRide;
