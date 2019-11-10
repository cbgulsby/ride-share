import React, { useState, useCallback } from "react";
import { Link as RRLink } from "react-router-dom";
import firebase from "firebase/app";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Box,
  Link,
  Heading
} from "@chakra-ui/core";
import Layout from "../components/Layout";

function SignUp({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [handicapAccessible, setHandicapAccessible] = useState(false);

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(() => {
            firebase.auth().onAuthStateChanged(newUser => {
              if (newUser) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(newUser.uid)
                  .set({
                    id: newUser.uid,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    driverVerified: false,
                    licenseNumber: licenseNumber,
                    licensePlate: licensePlate,
                    make: make,
                    model: model,
                    handicapAccessible: handicapAccessible
                  });
              }
            });
          });
        history.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    [
      history,
      firstName,
      lastName,
      phoneNumber,
      licenseNumber,
      licensePlate,
      make,
      model,
      handicapAccessible
    ]
  );

  return (
    <Layout>
      <Heading as="h1" size="xl" mb={4}>
        Sign Up
      </Heading>
      <Box as="form" onSubmit={handleSignUp}>
        <FormControl isRequired>
          <FormLabel htmlFor="email" fontSize="lg" fontWeight="bold">
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />

          <FormLabel htmlFor="password" fontSize="lg" fontWeight="bold">
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />

          <FormLabel htmlFor="firstName" fontSize="lg" fontWeight="bold">
            First Name
          </FormLabel>
          <Input
            id="firstName"
            value={firstName}
            placeholder="John"
            onChange={e => {
              setFirstName(e.target.value);
            }}
          />

          <FormLabel htmlFor="lastName" fontSize="lg" fontWeight="bold">
            Last Name
          </FormLabel>
          <Input
            id="lastName"
            value={lastName}
            placeholder="Doe"
            onChange={e => {
              setLastName(e.target.value);
            }}
          />

          <FormLabel htmlFor="phoneNumber" fontSize="lg" fontWeight="bold">
            Phone Number
          </FormLabel>
          <Input
            id="phoneNumber"
            type="phone"
            value={phoneNumber}
            placeholder="(XXX)-XXX-XXXX"
            onChange={e => {
              setPhoneNumber(e.target.value);
            }}
          />

          <Checkbox
            value={isDriver}
            onChange={() => {
              setIsDriver(!isDriver);
            }}
          >
            Would you like to offer rides to other users?
          </Checkbox>

          {isDriver ? (
            <Box>
              <FormLabel
                htmlFor="licenseNumber"
                fontSize="lg"
                fontWeight="bold"
              >
                Driver's License Number
              </FormLabel>
              <Input
                id="licenseNumber"
                type="text"
                value={licenseNumber}
                placeholder="XXXXXXXXX"
                onChange={e => {
                  setLicenseNumber(e.target.value);
                }}
              />

              <FormLabel htmlFor="licensePlate" fontSize="lg" fontWeight="bold">
                License Plate Number
              </FormLabel>
              <Input
                id="licensePlate"
                type="text"
                value={licensePlate}
                placeholder="XXXXXXXXX"
                onChange={e => {
                  setLicensePlate(e.target.value);
                }}
              />

              <FormLabel htmlFor="make" fontSize="lg" fontWeight="bold">
                Make
              </FormLabel>
              <Input
                id="make"
                type="text"
                value={make}
                placeholder="XXXXXXXXX"
                onChange={e => {
                  setMake(e.target.value);
                }}
              />

              <FormLabel htmlFor="model" fontSize="lg" fontWeight="bold">
                Model
              </FormLabel>
              <Input
                id="model"
                type="text"
                value={model}
                placeholder="XXXXXXXXX"
                onChange={e => {
                  setModel(e.target.value);
                }}
              />

              <Checkbox
                value={handicapAccessible}
                onChange={() => {
                  setHandicapAccessible(!handicapAccessible);
                }}
              >
                Check this box if the vehicle is handicap accessible.
              </Checkbox>
            </Box>
          ) : (
            <> </>
          )}
          <Box>
            <Button mt={4} variantColor="blue" type="submit">
              Create an account
            </Button>
          </Box>
        </FormControl>
      </Box>

      <Link as={RRLink} to="/login" d="block" mt={4}>
        Already have an account? Login.
      </Link>
    </Layout>
  );
}

export default SignUp;
