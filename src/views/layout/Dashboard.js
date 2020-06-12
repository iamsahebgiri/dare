import React from "react";
import { Avatar, Flex, Link } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import DarkMode from "../../components/DarkMode";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="grad-bg">
        <Flex align="center" justify="space-between" p={5}>
          <svg xmlns="http://www.w3.org/2000/svg" width="79" height="24" viewBox="0 0 79 24">
            <text id="Harami." transform="translate(0 19)" fill="#fff" fontSize="20" fontFamily="SFUIText-Bold, SF UI Text" fontWeight="700"><tspan x="0" y="0">Harami</tspan><tspan y="0" fill="#f50000">.</tspan></text>
          </svg>

          <Flex>
            <DarkMode />
            <Avatar size="sm" ml={4} />
          </Flex>
        </Flex>
      </div>
      <div className="dash-cta-container">
        <div className="dash-cta orange-grad">
          <div className="icon">
            <svg id="add" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <g id="Group_3" data-name="Group 3">
                <g id="Group_2" data-name="Group 2">
                  <path id="Path_1" data-name="Path 1" d="M17.882,0H1.626A1.626,1.626,0,0,0,0,1.626V17.882a1.626,1.626,0,0,0,1.626,1.626H17.882a1.626,1.626,0,0,0,1.626-1.626V1.626A1.626,1.626,0,0,0,17.882,0Z" fill="#fff" />
                </g>
              </g>
              <g id="Group_5" data-name="Group 5" transform="translate(22.759)">
                <g id="Group_4" data-name="Group 4">
                  <path id="Path_2" data-name="Path 2" d="M256.815,0H240.559a1.626,1.626,0,0,0-1.626,1.626V17.882a1.626,1.626,0,0,0,1.626,1.626h16.256a1.626,1.626,0,0,0,1.626-1.626V1.626A1.626,1.626,0,0,0,256.815,0Z" transform="translate(-238.933)" fill="#fff" />
                </g>
              </g>
              <g id="Group_7" data-name="Group 7" transform="translate(0 22.759)">
                <g id="Group_6" data-name="Group 6">
                  <path id="Path_3" data-name="Path 3" d="M17.882,238.933H1.626A1.626,1.626,0,0,0,0,240.559v16.256a1.626,1.626,0,0,0,1.626,1.626H17.882a1.626,1.626,0,0,0,1.626-1.626V240.559A1.626,1.626,0,0,0,17.882,238.933Z" transform="translate(0 -238.933)" fill="#fff" />
                </g>
              </g>
              <g id="Group_9" data-name="Group 9" transform="translate(22.759 22.759)">
                <g id="Group_8" data-name="Group 8">
                  <path id="Path_4" data-name="Path 4" d="M256.815,247.061h-6.5v-6.5a1.626,1.626,0,1,0-3.251,0v6.5h-6.5a1.626,1.626,0,1,0,0,3.251h6.5v6.5a1.626,1.626,0,0,0,3.251,0v-6.5h6.5a1.626,1.626,0,1,0,0-3.251Z" transform="translate(-238.933 -238.933)" fill="#fff" />
                </g>
              </g>
            </svg>
          </div>
          <div className="dash-cta-text1">
            Choose default Quiz
        </div>
        </div>
        <div className="dash-cta green-grad">
          <div className="icon">
            <svg id="add" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
              <path id="Path_5" data-name="Path 5" d="M0,0H60V60H0Z" fill="none" />
              <path id="Path_6" data-name="Path 6" d="M5.417,3H44.083A2.417,2.417,0,0,1,46.5,5.417V44.083A2.417,2.417,0,0,1,44.083,46.5H5.417A2.417,2.417,0,0,1,3,44.083V5.417A2.417,2.417,0,0,1,5.417,3ZM22.333,22.333H12.667v4.833h9.667v9.667h4.833V27.167h9.667V22.333H27.167V12.667H22.333Z" transform="translate(5.25 5.25)" fill="#fff" />
            </svg>

          </div>
          <div className="dash-cta-text2">
            Create your own quiz
        </div>
        </div>

      </div>
      <div className="dash-leaderboard-link">
        <Link as={RouterLink} to="/leaderboard">
          Check global leaderboard
        </Link>
      </div>

    </div>
  );
}