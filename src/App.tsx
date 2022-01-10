import { ThemeProvider } from "@mui/material/styles";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import theme from "src/utils/contexts/Theme";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div className="App"></div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
