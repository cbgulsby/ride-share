import React from "react";
import "./App.css";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewRide from "./pages/NewRide";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/ride/new" component={NewRide} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
