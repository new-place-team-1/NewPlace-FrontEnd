import { createTheme } from "@mui/material/styles";

import palette from "src/utils/styles/palette";

const theme = createTheme({
  palette: {
    // red
    primary: {
      main: palette.primaryColor,
    },
    // red
    secondary: {
      dark: palette.selected, // seleted, price
      main: palette.focus, // focus
      light: palette.shadow, // shadow
    },
  },
});

export default theme;
