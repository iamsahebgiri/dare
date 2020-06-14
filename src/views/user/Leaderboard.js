import React from 'react';
import { Avatar, IconButton, useColorMode, Link, Stack, Text, Badge } from "@chakra-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import "./Profile.css";
import "./Leaderboard.css";
import DarkMode from '../../components/DarkMode';


export default function Leaderboard() {
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "white" };
  const optionColor = { light: { background: "white" }, dark: { background: "rgba(255,255,255,0.08" } };
  return (
    <div className="onboarding-container">
      <div className="onboarding-heading">
        <div className="back">
          <Link as={RouterLink} to="/">
            <IconButton isRound="true" size="sm" icon={FiChevronLeft}  color={color[colorMode]} />
          </Link>
        </div>
        <div>Leaderboard</div>
        <div>
          <DarkMode />
        </div>
      </div>
      <Stack isInline align="center" spacing={4}>
        <div className="profile-picture">
          <span role="img" aria-label="Emoji">😎</span>
          <Avatar size="xl" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Text isTruncated>Ryan</Text><Badge variantColor="green">10</Badge>
        </div>
        <div className="profile-picture">
          <span role="img" aria-label="Emoji">👑</span>
          <Avatar size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />
          <Text isTruncated>Christian</Text><Badge variantColor="teal">30</Badge>
        </div>
        <div className="profile-picture">
          <span role="img" aria-label="Emoji">😂</span>
          <Avatar size="xl" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Text isTruncated>Kent</Text><Badge variantColor="blue">16</Badge>
        </div>
      </Stack>

      <Stack spacing={4} mt={4} mb={10} pb={8}>
        <div className="leaderboard-item active">
          <div className="left-leaderboard-item">
            <div className="num">4.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Riya (you)</div>
          </div>
          <div className="point">10</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
        <div className="leaderboard-item" style={optionColor[colorMode]}>
          <div className="left-leaderboard-item">
            <div className="num">5.</div>
            <Avatar size="sm" />
            <div className="leaderboard-username">Ronnie</div>
          </div>
          <div className="point">9</div>
        </div>
      </Stack>
    </div>
  )
}
