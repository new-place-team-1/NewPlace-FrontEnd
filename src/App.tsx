import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "@mui/material/styles";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { sizeBoundary } from "src/config/device"
import theme from "src/utils/contexts/Theme";
import Header from "src/components/layout/header";
import BottomMenu from "src/components/layout/bottomMenu";

function App() {
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div id="app">
          <Header />
          {!isDesktopsize && <BottomMenu />}
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
