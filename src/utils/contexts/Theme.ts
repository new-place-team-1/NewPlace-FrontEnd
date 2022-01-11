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
