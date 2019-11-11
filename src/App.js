import React from "react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewRide from "./pages/NewRide";
import OfferRide from "./pages/OfferRide";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Router>
          <>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/ride/new" component={NewRide} />
            <PrivateRoute exact path="/ride/offer" component={OfferRide} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
