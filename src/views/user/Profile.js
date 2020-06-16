import React from 'react';
import { Avatar, IconButton, useColorMode, Link } from "@chakra-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import "./Profile.css";
import DarkMode from '../../components/DarkMode';

export default function Profile() {
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "white" };

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
       Rank: 30
       Points: 230
      </div>
      <div className="btn-group">
        <Link as={RouterLink} to="/">
          <button className="btn btn-primary">Logout</button>
        </Link>
      </div>
    </div>
  )
}
