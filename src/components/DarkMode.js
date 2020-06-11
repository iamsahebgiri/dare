import React from 'react'
import { Button, useColorMode } from "@chakra-ui/core";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  )
}
