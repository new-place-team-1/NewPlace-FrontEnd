import { ThemeProvider } from "@mui/material/styles";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "src/utils/contexts/Theme";
import Layout from "src/layout";
import Policy from "src/templates/policy";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div id="app">
            <Layout />
            <main>
              <Routes>
                <Route path="/">
                  <Route path="policy/:tab" element={<Policy />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
