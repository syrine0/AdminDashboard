import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard  from "scenes/dashboard";
import Customers from "scenes/customers/index.jsx";
import Projects from "scenes/projects";
import Tickets from "scenes/tickets";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tickets" element={<Tickets />} />

             
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;