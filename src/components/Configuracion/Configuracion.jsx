import {
  TextField,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { params } from "./params";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useChartContext } from "../../context/chartContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthContext } from "../../context/authContext";

import "dayjs/locale/es";
import dayjs from "dayjs";

export default function Configuracion() {

  const { logout } = useAuthContext();

  //Definimos un estado para cada uno de los campos del formulario
  const [lang, setLang] = useState("");
  const [category, setCategory] = useState("");
  const [widget, setWidget] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [time, setTime] = useState("");
  const { fetchApi, chartData, loading } = useChartContext();

  //Definimos una funcion handle change para cada uno de los campos del formulario
  const handleChangeLang = (event) => {
    setLang(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeWidget = (event) => {
    setWidget(event.target.value);
  };

  const handleChangeDateStart = (event) => {
    const fechaInicial = dayjs(event).format("YYYY-MM-DDTHH:MM");
    setDateStart(fechaInicial);
  };

  const handleChangeDateEnd = (event) => {
    const fechaFinal = dayjs(event).format("YYYY-MM-DDTHH:MM");
    setDateEnd(fechaFinal);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Álvaro Rodriguez
          </Typography>
          <Button onClick={logout} variant="outlined" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ margin: "0 auto", p: "5%", width: "50%" }}>
        <form
          onSubmit={(e) =>
            fetchApi(e, lang, category, widget, dateStart, dateEnd, time)
          }
        >
          <Grid container sx={{ display: "flex", flexDirection: "row" }}>
            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Idioma</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lang}
                  label="Idioma"
                  onChange={handleChangeLang}
                >
                  {params.lang.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Categoria"
                  onChange={handleChangeCategory}
                >
                  {params.data.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.category}>
                        {item.category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Widget</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={widget}
                  label="Widget"
                  onChange={handleChangeWidget}
                >
                  {params.data.map((item) => {
                    if (category == item.category) {
                      return item.widget.map((i, index) => {
                        return (
                          <MenuItem key={index} value={i}>
                            {i}
                          </MenuItem>
                        );
                      });
                    }
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Fecha inicio"
                  onChange={handleChangeDateStart}
                />{" "}
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Fecha final"
                  onChange={handleChangeDateEnd}
                />{" "}
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ p: 1 }} item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Tiempo"
                  onChange={handleChangeTime}
                >
                  {params.time_trunc.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={{ p: 1 }} md={4} xs={12}>
              <Button variant="contained" type="submit">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ ml: "40%" }}>
          <ClipLoader
            color="rgb(233, 83, 30)"
            loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </Box>
    </>
  );
}
