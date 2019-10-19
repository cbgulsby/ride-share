import React from "react";
import "./App.css";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
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
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
