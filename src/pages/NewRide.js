import React from "react";
import firebase from "firebase/app";
import { AuthContext } from "../components/Auth";
import Layout from "../components/Layout";
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
    <Layout>
      <NewRideForm onCreateRide={onCreateRide} />
    </Layout>
  );
}

export default NewRide;
