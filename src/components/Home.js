import React from "react";
import app from "../base";
import * as firebase from 'firebase'
import {
  Text,
} from '@chakra-ui/core'

const Home = () => {

  var userId = firebase.auth().currentUser.uid;

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <Text>{userId}</Text>
    </>
  );
};

export default Home;
