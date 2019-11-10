import React, { useState } from "react";
import firebase from "firebase/app";
import { Box } from "@chakra-ui/core";
import OfferRideForm from "../components/OfferRideForm";
import RideRequestList from "../components/RideRequestList";

function OfferRide() {
  const [requestList, setRequestList] = useState([]);

  function onOfferRide(values) {
    firebase
      .firestore()
      .collection("requests")
      .where("toCity", "==", values.toCity)
      .get()
      .then(function(querySnapshot) {
        const tempRequestList = [];
        const userIds = [];
        querySnapshot.forEach(function(doc, i) {
          const {
            date,
            fromCity,
            fromState,
            fromStreet,
            fromZipCode,
            toCity,
            toState,
            toZipCode,
            toFacility,
            toStreet,
            userId
          } = doc.data();

          tempRequestList.push({
            pickupInfo: {
              fromCity: fromCity,
              fromState: fromState,
              fromStreet: fromStreet,
              fromZipCode: fromZipCode
            },
            dropOffInfo: {
              toCity: toCity,
              toState: toState,
              toZipCode: toZipCode,
              toFacility: toFacility,
              toStreet: toStreet
            },
            date: date,
            requestingUser: userId,
            requestID: doc.id
          });
          userIds.push(userId);
        });

        fetchUsers(userIds).then(userArray => {
          tempRequestList.map(tempRequest => {
            tempRequest.user = userArray.find(
              user => user.id === tempRequest.requestingUser
            );
            return tempRequest;
          });
          setRequestList(tempRequestList);
        });
      });
  }

  function fetchUsers(userIds) {
    return firebase
      .firestore()
      .collection("users")
      .where("id", "in", userIds)
      .get()
      .then(response => {
        const userArray = [];

        response.forEach(s => {
          userArray.push(s.data());
        });
        return userArray;
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
