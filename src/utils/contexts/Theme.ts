import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "src/utils/styles/palette";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      // red
      primary: {
        main: palette.primary.main,
        light: palette.primary.light,
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
        fontSize: "1.8rem",
        textAlign: "center",
        fontWeight: "bold",
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
          {
            props: { size: "medium", color: "secondary" },
            style: {
              fontSize: 18,
            },
          },
        ],
      },
      MuiAlert: {
        variants: [
          {
            props: { variant: "filled", severity: "success" },
            style: {
              width: 200,
              backgroundColor: palette.primary.light,
            },
          },
        ],
      },
    },
  }),
);

export default theme;
