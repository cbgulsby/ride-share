import React from "react";
import RequestCard from "../components/RequestCard";
import {
  Box,
  Text,
  // List,
  ListItem
} from "@chakra-ui/core";

function RideRequestList({ requestList }) {
  const array = [];
  for (let i = 0; i < requestList.length; i++) {
    array.push(
      <ListItem key={i} item={requestList.toCity} />
      // requestList[i]
    );
  }

  // console.log("my array")
  // console.log(array)

  // function listItems(requestList) {
  // 	requestList.forEach
  // }

  // function listItems(requestList) {
  // 	return (
  // 		<li>
  // 			<Text>
  // 			{request}
  // 			</Text>
  // 		</li>
  // 	);
  // }

  // const listItems = requestList.map((request) => {
  // 	<li key={request.index.toString()}>
  // 		<Text>
  // 			{request}
  // 		</Text>
  // 	</li>
  // })

  return (
    <Box>
      <Text>Here</Text>
      <Box>
        {array.map(request => (
          <RequestCard toCity={request.toCity} />
        ))}
      </Box>
    </Box>
  );
}

export default RideRequestList;
