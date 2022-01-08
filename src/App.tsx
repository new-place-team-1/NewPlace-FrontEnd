import logo from "./logo.svg";
import { ThemeProvider } from "@mui/material/styles";

import theme from "src/utils/contexts/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
