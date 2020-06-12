import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider, } from '@chakra-ui/core';
import customTheme from "./theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Dashboard from './views/layout/Dashboard';
import './App.css';


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
