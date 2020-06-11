import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider, } from '@chakra-ui/core';
import customTheme from "./theme";
import { Divider } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Home from './views/layout/Home';
import DarkMode from './components/DarkMode'

import './App.css';


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <DarkMode />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Divider />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
