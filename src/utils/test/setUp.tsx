import { mount } from "@cypress/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import theme from "src/utils/contexts/Theme";

const setUp = (TestComponent: any, props?: object) => {
  mount(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <TestComponent {...props} />
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>,
  );
};

export default setUp;
