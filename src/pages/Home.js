import React from "react";
import firebase from "firebase/app";
import { Box, Button, Heading, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../components/Auth";

const firestore = firebase.firestore();

function Home() {
  const { currentUser } = React.useContext(AuthContext);

  const [requests, setRequests] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    firestore
      .collection("requests")
      .where("userId", "==", currentUser.uid)
      .onSnapshot(query => {
        const requestArr = [];
        query.forEach(snapshot => {
          requestArr.push(snapshot.data());
        });
        const userIds = requestArr
          .flatMap(request => request.offers)
          .filter(Boolean);
        if (userIds.length > 0) {
          fetchUsers(userIds).then(fetchedUsers => {
            setUsers(fetchedUsers);
            setRequests(requestArr);
          });
        } else {
          setRequests(requestArr);
        }
      });
  }, [currentUser.uid]);

  function fetchUsers(userIds) {
    if (userIds.length > 0) {
      return firestore
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
    } else return new Promise(res => res([]));
  }

  return (
    <Layout>
      {requests.length > 0 && (
        <>
          <Heading as="h1" size="md" mb={8}>
            Requests
          </Heading>

          {requests.map((request, i) => (
            <Box key={i} px={4} py={8} bg="white">
              <Text>
                To: {request.toStreet} {request.toCity}, {request.toState}{" "}
                {request.toZipCode}
              </Text>
              <Heading as="h3" size="sm" mt={4}>
                Offers
              </Heading>
              {request.offers.length > 0 &&
                request.offers.map(offer => {
                  const user = users.find(user => user.id === offer);
                  return (
                    <Box key={user.id} my={4}>
                      <Text>
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text>{user.phoneNumber}</Text>
                      <Button>Accept Ride</Button>
                    </Box>
                  );
                })}
            </Box>
          ))}
        </>
      )}

      <Box as="hr" mb={16} />

      <Box>
        <Button as={Link} to="/ride/new" variantColor="blue">
          Request a Ride
        </Button>
      </Box>
      <Box>
        <Button as={Link} to="/ride/offer" variantColor="red">
          Offer a Ride
        </Button>
      </Box>
      <Box>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </Box>
    </Layout>
  );
}

export default Home;
