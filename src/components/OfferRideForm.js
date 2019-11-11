import React from "react";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import { Flex, Box, Button, Text } from "@chakra-ui/core";
import TextFormField from "./TextFormField";

const schema = yup.object({
  fromCity: yup.string().required(),
  fromState: yup.string().required(),
  toCity: yup.string().required(),
  toState: yup
    .string()
    .required()
    .length(2),
  date: yup
    .string()
    .required()
    .min(3)
});

function OfferRide({ onOfferRide }) {
  return (
    <Formik
      initialValues={{
        fromCity: "",
        fromState: "",
        toCity: "",
        toState: "",
        date: ""
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        onOfferRide(values);
      }}
    >
      {() => (
        <Box as={Form}>
          <Box as="fieldset" mt={4} mb={10} borderBottomWidth="1px">
            <Text as="legend" fontSize="lg" fontWeight="bold">
              Start Location
            </Text>
            <Flex justify="space-between" mt={-4}>
              <Field
                name="fromCity"
                label="City"
                isRequired
                component={TextFormField}
              />
              <Field
                name="fromState"
                label="State"
                isRequired
                component={TextFormField}
              />
            </Flex>
          </Box>

          <Box as="fieldset" mt={4} mb={10} borderBottomWidth="1px">
            <Text as="legend" fontSize="lg" fontWeight="bold">
              Destination
            </Text>
            <Flex justify="space-between" mt={-4}>
              <Field
                name="toCity"
                label="City"
                isRequired
                component={TextFormField}
              />
              <Field
                name="toState"
                label="State"
                isRequired
                component={TextFormField}
              />
            </Flex>
          </Box>

          <Field
            name="date"
            label="Date"
            isRequired
            component={TextFormField}
          />

          <Button mt={4} type="submit" variantColor="blue">
            Find Ride Requests
          </Button>
        </Box>
      )}
    </Formik>
  );
}

export default OfferRide;
