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
import OnBoarding from './views/layout/OnBoarding';
import CreateQuiz from "./views/quiz/CreateQuiz";
import ReadQuiz from "./views/quiz/ReadQuiz";
import Profile from "./views/user/Profile";
import Leaderboard from "./views/user/Leaderboard";
import './App.css';
import { auth } from "./config/firebaseConfig";
import { useStoreActions } from 'easy-peasy';

function App() {
  const setUserData = useStoreActions(actions => actions.user.setUserData);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserData(user);
    }
  })

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
            <Route path="/onboarding">
              <OnBoarding />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/create">
              <CreateQuiz />
            </Route>
            <Route path="/show">
              <ReadQuiz />
            </Route>

            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/">
              Error 404, Not Found
            </Route>

          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
