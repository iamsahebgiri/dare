import React from 'react'
import { IconButton, useColorMode } from "@chakra-ui/core";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const color = { light: "gray.800", dark: "white" };
    return (
        <IconButton color={color[colorMode]} onClick={toggleColorMode} isRound="true" size="sm" aria-label="Change dark mode" icon={colorMode === "light" ? FiMoon : FiSun} />
    )
}