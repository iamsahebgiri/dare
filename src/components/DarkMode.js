import React from 'react'
import { IconButton, useColorMode } from "@chakra-ui/core";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton onClick={toggleColorMode} isRound="true" size="sm" aria-label="Search database" icon={colorMode === "light" ? FiMoon : FiSun} />
    )
}