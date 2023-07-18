import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DrawerHeader } from "./utils/DrawerHeader/DrawerHeader";
import { AppBar } from "./utils/AppBar/AppBar";
import { Drawer } from "./utils/Drawer/Drawer";
import Login from "../Login/Login";
import { menuDrawer } from "./utils/const/menuDrawer";
import {
  Button,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useAuthContext } from "../../context/authContext";
import BarChart from "../BarChart/BarChart";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";
import Configuracion from "../Configuracion/Configuracion";

const drawerWidth = 240;

export default function MiniDrawer() {

  //Theme que lleva como prop el drawer
  const theme = useTheme();

  //Definimos open para abrir y cerrar el menu
  const [open, setOpen] = useState(false);

  //Definimos menu para las opciones de nuestra drawer donde se veran las distintas gráficas
  const [menu, setMenu] = useState("Grafica de barras");

  //Traemos el logout de nuestro authContext
  const { logout } = useAuthContext();

  //Funcion que abre y cierra el drawer
  function handleDrawer() {
    setOpen((currentState) => !currentState);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Prueba Frontend
          </Typography>
          <Button onClick={logout} variant="outlined" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
        <DrawerHeader theme={theme}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuDrawer.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenu(item.name)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {menu == "Grafica de barras" && <BarChart />}
        {menu == "Grafica de lineas" && <LineChart />}
        {menu == "Grafica circular" && <PieChart />}
      </Box>
    </Box>

  );
}
