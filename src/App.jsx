import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/themeProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./Views/Home/Home";
import LoginView from "./Views/LoginView/LoginView";
import "./App.css";
import AuthContextProvider from "./context/authContext";
import ConfiguracionView from "./Views/Configuracion/ConfiguracionView.jsx/ConfiguracionView";
import ChartContextProvider from "./context/chartContext";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute"
import PublicRoute from "./Routes/PublicRoute/PublicRoute"

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ChartContextProvider>
          <ThemeProvider theme={theme}>
            <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LoginView />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/configuracion" element={<ConfiguracionView />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ChartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
