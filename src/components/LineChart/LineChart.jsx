import { useState } from "react";
import { useChartContext } from "../../context/chartContext";
import { Box, Button, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { options } from "./utils/options";
import ConfiguracionChart from "../Configuracion/ConfiguracionChart";

export default function LineChart() {
  //Extendemos DAYJS para poder darle formato a las fechas
  dayjs.extend(localizedFormat);

  //Traemos chartData del context
  const { chartData } = useChartContext();

  //ChartIndex lo usaremos para navegar por los distintos indices de chartData
  const [chartIndex, setChartIndex] = useState(0);

  //Nos aseguramos de que la página no devuelva nada en caso de que no llegue chartData
  if (!chartData) {
    return null;
  }

  //Registramos los elementos que usa nuestro chart
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  //Definimos labels, values y los elementos del datagrid para la estructura de datos que tiene el array "content"
  const labels1 = chartData?.included[chartIndex].attributes.content?.map(
    (item, index) => {
      if (
        index !==
        chartData.included[chartIndex].attributes.content.length - 1
      ) {
        return item.type;
      }
    }
  );

  const values1 = chartData?.included[chartIndex].attributes.content?.map(
    (item, index) => {
      if (
        index !==
        chartData.included[chartIndex].attributes.content.length - 1
      ) {
        return item.attributes.total;
      }
    }
  );

  const columns1 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "Tipo de energia",
      width: 200,
      editable: true,
    },
    {
      field: "value",
      headerName: "Valor total",
      width: 200,
      editable: true,
    },
    {
      field: "group",
      headerName: "Grupo energético",
      width: 200,
      editable: true,
    },
  ];

  const rows1 = chartData?.included[chartIndex]?.attributes?.content?.map(
    (item, index) => {
      return {
        id: index + 1,
        type: item.type,
        value: item.attributes.total,
        group: item.groupId,
      };
    }
  );
  //Definimos labels, values y los elementos del datagrid para la segunda estructura de datos que tiene el array "values"

  const labels2 = chartData?.included[chartIndex].attributes.values?.map(
    (item, index) => {
      return dayjs(item.datetime).format("LL");
    }
  );

  const values2 = chartData?.included[chartIndex].attributes.values?.map(
    (item, index) => {
      return item.value;
    }
  );

  const columns2 = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "value",
      headerName: "Valor",
      width: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "Fecha",
      width: 200,
      editable: true,
    },
    {
      field: "group",
      headerName: "Grupo",
      width: 200,
      editable: true,
    },
  ];

  const rows2 = chartData?.included[chartIndex]?.attributes?.values?.map(
    (item, index) => {
      return {
        id: index + 1,
        value: item.value,
        date: dayjs(item.datetime).format("LL"),
        group: chartData?.included[chartIndex]?.groupId,
      };
    }
  );

  //Aqui definimos data1 y data2 para los dos tipos de estructura de datos que pueden recibir las gráficas
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Energia",
        data: values1,
        backgroundColor: chartData?.included[
          chartIndex
        ].attributes?.content?.map((item) => {
          return item.attributes.color;
        }),
      },
    ],
  };

  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "Energia",
        data: values2,
        backgroundColor: chartData?.included[chartIndex]?.attributes.color,
      },
    ],
  };

  return (
    <>
    <Grid sx={{width:"100%"}} container>
        <Grid item xs={9} md={10} xl={8}>
    <Box sx={{ mt: "5%", width: "100%" }}>
      <Grid container sx={{  ml:"25%", mb: 2 }}>
        {chartData.included.map((item, index) => {
          return (
            <Grid key={index} item xs={2} md={2} xl={2} sx={{ p: 1 }}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => setChartIndex(index)}
              >
                {item.type}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {labels1?(<Line options={options} data={data1}/>):(<Line options={options} data={data2}/>)}
    </Box>
    </Grid>
    <Grid item xs={5}md={4} xl={2} sx={{mt:10, ml:10}}>
        <ConfiguracionChart/>
    </Grid>
    </Grid>
    <Box sx={{mt:5}}>
    {labels1?(<DataGrid rows={rows1} columns={columns1} slots={{ toolbar: GridToolbar }} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick/>):(<DataGrid rows={rows2} columns={columns2} slots={{ toolbar: GridToolbar }} initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick/>)}
        </Box>
    </>
  );
}
