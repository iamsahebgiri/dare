import React from 'react';
import { Avatar, IconButton, useColorMode, Link, useToast } from "@chakra-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { Link as RouterLink, useHistory } from "react-router-dom";
import "./Profile.css";
import DarkMode from '../../components/DarkMode';
import { auth } from "./../../config/firebaseConfig";

export default function Profile() {
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "white" };
  let browserHistory = useHistory();
  const toast = useToast();
  
  return (
    <div className="onboarding-container">
      <div className="onboarding-heading">
        <div className="back">
          <Link as={RouterLink} to="/">
            <IconButton isRound="true" size="sm" icon={FiChevronLeft} color={color[colorMode]} />
          </Link>
        </div>
        <div>Profile</div>
        <div>
          <DarkMode />
        </div>
      </div>
      <div className="profile-picture">
        <Avatar size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />
        <span>Christian Nwamba</span>
      </div>
      <div>
        Content goes here
      </div>
      <div className="btn-group">
        <button onClick={() => {
          auth.signOut().then(function () {
            toast({
              title: "Logged out",
              description: "You are successfully logged out.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            browserHistory.push("/login");
          }).catch(function (error) {
            // An error happened.
          });
        }} className="btn btn-primary">Logout</button>
      </div>
    </div >
  )
}
