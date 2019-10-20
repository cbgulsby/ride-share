import React, { useState, /*useEffect,*/ useCallback} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { app } from "../base";
import * as firebase from "firebase";
import {
  FormControl, 
  FormLabel, 
  Input,
  Button,
  Spinner,
  Text,
  ButtonGroup,
  Checkbox,
} from '@chakra-ui/core'

const SignUp = ({ history }) => {

  // data structure for user object being push to database
  // type User = {
  //   email: string;                
  //   password: string;             
  //   firstName: string;
  //   lastName: string;
  //   phoneNumber: string;
  //   driverVerified: Boolean;      
  //   licenseNumber: string;        
  //   licensePlate: string;         
  //   make: string;                 
  //   model: string;                
  //   handicapAccessible: Boolean;
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [window, setWindow] = useState('loading');
  const [isDriver, setIsDriver] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [handicapAccessible, setHandicapAccessible] = useState(false);
  // const [signingIn, setSigningIn] = useState('');  //TODO: loading screen while signing in

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
          firebase.auth().onAuthStateChanged(newUser => {
            if(newUser) {
              firebase.database().ref('users/' + newUser.uid).set({
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
              })
            }
            else {
              setWindow('signup')
            }
          })
        });
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }, [history, firstName, lastName, phoneNumber, licenseNumber, licensePlate, make, model, handicapAccessible]);

  return (
    <div>
      {
        window === '' ?
        <Spinner /> :
        <div>
          <Text>Sign Up</Text>
          <form onSubmit={handleSignUp} style={{flex: "space-between"}}>
            <FormControl isRequired>
              <FormLabel>
                Email
              </FormLabel>
              <Input id="email" type="email" value={email} placeholder="example@email.com" onChange={e => {setEmail(e.target.value)}} />
              <FormLabel>
                Password
              </FormLabel>
              <Input id="password" type="password" value={password} placeholder="password" onChange={e => {setPassword(e.target.value)}} />
              <FormLabel>
                First Name
              </FormLabel>
              <Input id="firstName" value={firstName} placeholder="John" onChange={e => {setFirstName(e.target.value)}} />
              <FormLabel>
                Last Name
              </FormLabel>
              <Input id="lastName" value={lastName} placeholder="Doe" onChange={e => {setLastName(e.target.value)}} />
              <FormLabel>
                Phone Number
              </FormLabel>
              <Input id="phoneNumber" type="phone" value={phoneNumber} placeholder="(XXX)-XXX-XXXX" onChange={e => {setPhoneNumber(e.target.value)}} />
              <Checkbox value={isDriver} onChange={() => {setIsDriver(!isDriver)}}>Would you like to offer rides to other users?</Checkbox>
              {isDriver ? 
                <div>
                  <FormLabel>
                    Driver's License Number
                  </FormLabel>
                  <Input id="licenseNumber" type="text" value={licenseNumber} placeholder="XXXXXXXXX" onChange={e => {setLicenseNumber(e.target.value)}} />
                  <FormLabel>
                    License Plate Number
                  </FormLabel>
                  <Input 
                    id="licensePlate" 
                    type="text" 
                    value={licensePlate} 
                    placeholder="XXXXXXXXX" 
                    onChange={e => {setLicensePlate(e.target.value)}} 
                  />
                  <FormLabel>
                    Make
                  </FormLabel>
                  <Input 
                    id="make" 
                    type="text" 
                    value={make} 
                    placeholder="XXXXXXXXX" 
                    onChange={e => {setMake(e.target.value)}} 
                  />
                  <FormLabel>
                    Model
                  </FormLabel>
                  <Input 
                    id="model" 
                    type="text" 
                    value={model} 
                    placeholder="XXXXXXXXX" 
                    onChange={e => {setModel(e.target.value)}} 
                  />
                  <Checkbox 
                    value={handicapAccessible} 
                    onChange={() => {setHandicapAccessible(!handicapAccessible)}}
                  >
                    Check this box if the vehicle is handicap accessible.
                  </Checkbox>
                </div> :
                  <> </>
              }
              <ButtonGroup spacing={4}>
                <Button 
                  mt={4}
                  variantColor="teal"
                  type="submit"
                >
                  Submit
                </Button>
                <Link to="/login">
                  <Button
                    mt={4}
                    variantColor="teal"
                    type="submit"
                  >
                    Login
                  </Button>
                </Link>
              </ButtonGroup>
            </FormControl>
          </form>
        </div>
      }
    </div>
  );
};

export default withRouter(SignUp);