import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#90CDF4",
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE",
      600: "#2B6CB0",
      700: "#2C5282",
      800: "#2A4365",
      900: "#1A365D",
    },
    beige: {
      50: "#FDFAF4",
      100: "#F9F3E3",
      200: "#F5EDD2",
      300: "#EFE0B8",
      400: "#E8D09E",
      500: "#D4B483",
    },
  },
  styles: {
    global: {
      body: {
        bg: "beige.100",
        color: "gray.800",
      },
    },
  },
  fonts: {
    heading: "'Segoe UI', sans-serif",
    body: "'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});

export default theme;
