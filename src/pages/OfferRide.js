import React, { useState } from "react";
import firebase from "firebase/app";
// import { AuthContext } from "../components/Auth";
import { Box } from "@chakra-ui/core";
import OfferRideForm from "../components/OfferRideForm";
import RideRequestList from "../components/RideRequestList";

function OfferRide({ history }) {
  const [requestList, setRequestList] = useState([]);

  // const { currentUser } = React.useContext(AuthContext);

  function onOfferRide(values) {
    firebase
      .firestore()
      .collection("requests")
      .where("toCity", "==", values.toCity)
      .get()
      .then(function(querySnapshot) {
        const tempRequestList = [];
        querySnapshot.forEach(function(doc) {
          // console.log(doc.data())
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
        console.log("end");
      });
    // console.log(requestList);
  }

  return (
    <Box>
      <Box p={5}>
        <OfferRideForm onOfferRide={onOfferRide} />
      </Box>
      <Box>
        <RideRequestList requestList={requestList} />
      </Box>
    </Box>
  );
}

export default OfferRide;
