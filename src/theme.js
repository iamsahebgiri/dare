import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    heading: "SF UI Text, Roboto",
    body: "SF UI Text, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    ...theme.colors,
    brand:
    {
      "50": '#e6edff',
      100: '#b9c7fb',
      200: '#8b9df3',
      300: '#5e72ed',
      400: '#3256e7',
      500: '#1a48ce',
      600: '#1242a1',
      700: '#0b3774',
      800: '#052648',
      900: '#01101d',
    },

  }
}
export default customTheme;