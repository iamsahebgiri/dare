import React from 'react';
import DarkMode from '../../components/DarkMode';
import { IconButton, Link, useColorMode } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import "./CreateQuiz.css";

export default function CreateQuiz() {
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "white" };
  const optionColor = { light: { background: "white" }, dark: { background: "rgba(255,255,255,0.08" } };
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="back">
          <Link as={RouterLink} to="/">
            <IconButton isRound="true" size="sm" icon={FiChevronLeft} color={color[colorMode]} />
          </Link>
        </div>
        <div className="quiz-title">1/20</div>
        <div>
          <DarkMode />
        </div>
      </div>
      <div className="quiz-question-wrapper">
        <div className="quiz-questions-container">
          <p>Who among them is best in almost everything?</p>
        </div>
        <div className="fake-quiz-container"></div>
      </div>
      <div className="quiz-options">
        <div className="direction" style={{ color: color[colorMode] }}>
          Choose the correct answer.
        </div>
        <div className="option correct" style={optionColor[colorMode]}>
          Amit
        </div>
        <div className="option wrong" style={optionColor[colorMode]}>
          Ashish
        </div>
        <div className="option" style={optionColor[colorMode]}>
          Ankita
        </div>
        <div className="option" style={optionColor[colorMode]}>
          Swapna
        </div>
      </div>
    </div>
  )
}
