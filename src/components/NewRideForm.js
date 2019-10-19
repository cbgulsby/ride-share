import React from "react";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import { Flex, Box, Button, Text } from "@chakra-ui/core";
import TextFormField from "./TextFormField";
import TextAreaFormField from "./TextAreaFormField";

const schema = yup.object({
  date: yup
    .string()
    .required()
    .min(3),
  notes: yup.string(),
  fromStreet: yup.string().required(),
  fromCity: yup.string().required(),
  fromState: yup
    .string()
    .required()
    .length(2),
  fromZipCode: yup.string().required(),
  toFacility: yup.string(),
  toStreet: yup.string().required(),
  toCity: yup.string().required(),
  toState: yup
    .string()
    .required()
    .length(2),
  toZipCode: yup.string().required()
});

function NewRide({ onCreateRide }) {
  return (
    <Formik
      initialValues={{
        fromStreet: "",
        fromCity: "",
        fromState: "",
        fromZipCode: "",
        toFacility: "",
        toStreet: "",
        toCity: "",
        toState: "",
        toZipCode: "",
        date: "",
        notes: ""
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        onCreateRide(values);
      }}
    >
      {() => (
        <Box as={Form}>
          <Box as="fieldset" mt={4} mb={10} borderBottomWidth="1px">
            <Text as="legend" fontSize="lg" fontWeight="bold">
              Pick up
            </Text>
            <Field
              name="fromStreet"
              label="Street"
              isRequired
              component={TextFormField}
            />
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
              <Field
                name="fromZipCode"
                label="Zip code"
                isRequired
                component={TextFormField}
              />
            </Flex>
          </Box>

          <Box as="fieldset" mt={4} mb={10} borderBottomWidth="1px">
            <Text as="legend" fontSize="lg" fontWeight="bold">
              Destination
            </Text>
            <Field
              name="toFacility"
              label="Facility"
              isRequired
              component={TextFormField}
            />
            <Field
              name="toStreet"
              label="Street"
              isRequired
              component={TextFormField}
            />
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
              <Field
                name="toZipCode"
                label="Zip code"
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

          <Field name="notes" label="Notes" component={TextAreaFormField} />

          <Button mt={4} type="submit" variantColor="blue">
            Create a Ride
          </Button>
        </Box>
      )}
    </Formik>
  );
}

export default NewRide;
