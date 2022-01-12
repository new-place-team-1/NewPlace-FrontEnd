import { createTheme } from "@mui/material/styles";

import palette from "src/utils/styles/palette";

const theme = createTheme({
  palette: {
    // red
    primary: {
      main: palette.primaryColor,
    },
    // black
    secondary: {
      main: palette.font.label,
      light: palette.font.placeholder,
    },
    // red
    info: {
      dark: palette.selected, // seleted, price
      main: palette.focus, // focus
      light: palette.shadow, // shadow
    },
  },
  typography: {
    h2: {
      fontSize: 18,
      textAlign: "center",
    },
    caption: {
      fontSize: 12,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined", size: "large" },
          style: {
            borderRadius: 12,
            fontSize: 18,
          },
        },
      ],
    },
  },
});

export default theme;
