import { Box, Button, Grid } from "@mui/material";
import { useChartContext } from "../../context/chartContext";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { options } from "./utils/options";
import { useEffect, useState } from "react";
import ConfiguracionChart from "../Configuracion/ConfiguracionChart";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function BarChart() {
    //EXTENDEMOS DAYJS PARA PODER DARLE FORMATO A LAS FECHAS
    dayjs.extend(localizedFormat);

    //TRAEMOS CHARTDATA DEL CONTEXT
    const { chartData } = useChartContext();
    //CHART INDEX LO USAREMOS PARA NAVEGAR POR LOS DISTINTOS INDICES DE CHARTDATA
    const [chartIndex, setChartIndex] = useState(0);
  
    //NOS ASEGURAEMOS DE QUE LA PÁGINA NO DEVUELVA NADA EN CASO DE QUE NO LE LLEGUE CHARTDATA
  if (!chartData) {
    return null;
  }

    //REGISTRAMOS LOS ELEMENTOS QUE USA NUESTRO CHART
  Chart.register(ArcElement, Tooltip, Legend);

  //DEFINIMOS LABELS, VALUES Y LOS ELEMENTOS DEL DATAGRID PARA LA ESTRUCTURA DE DATOS QUE TIENE "CONTENT"
  const labels1 = chartData?.included[chartIndex]?.attributes.content?.map(
    (item, index) => {
      return item.type;
    }
  );
  //Definimos SumaValues para realizar el sumatorio de la variable percentages que hay en dataChart
  let sumaValues = 0;

  const arrayValues = chartData?.included[chartIndex]?.attributes.content?.map(
    (item, index) => {
      if (
        index !==
        chartData.included[chartIndex].attributes.content.length - 1
      ) {
        return item.attributes.values.map((i) => {
          return i.percentage;
        });
      }
    }
  );

  const values1 = arrayValues?.map((array) => {
    return array?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      sumaValues
    );
  });

  const columns1 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "Tipo de energia",
      width: 200,
      editable: true,
    },
    {
      field: "percentage",
      headerName: "Porcentaje total",
      width: 200,
      editable: true,
    },
  ];

  const rows1 = chartData?.included[chartIndex]?.attributes?.content?.map(
    (item, index) => {
      if (index < chartData?.included[chartIndex]?.attributes.content.length) {
        return {
          id: index + 1,
          type: item.type,
          percentage: values1[index],
        };
      }
    }
  );

  //DEFINIMOS LABELS, VALUES Y LOS ELEMENTOS DEL DATAGRID PARA LA SEGUNDA ESTRUCTURA DE DATOS QUE TIENE EL ARRAY "VALUES"

  const labels2 = chartData?.included[chartIndex]?.attributes.values?.map(
    (item, index) => {
      return dayjs(item.datetime).format("LL");
    }
  );

  const values2 = chartData?.included[chartIndex]?.attributes.values?.map(
    (item, index) => {
      return item.percentage;
    }
  );

  const columns2 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "Tipo",
      width: 200,
      editable: true,
    },
    {
      field: "percentage",
      headerName: "Porcentaje",
      width: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "Fecha",
      width: 200,
      editable: true,
    },
  ];

  const rows2 = chartData?.included[chartIndex]?.attributes?.values?.map(
    (item, index) => {
      if (index < chartData?.included[chartIndex]?.attributes.values.length) {
        return {
          id: index + 1,
          type: chartData?.included[chartIndex]?.type,
          percentage: values2[index],
          date: dayjs(item.datetime).format("LL"),
        };
      }
    }
  );

  //AQUI DEFINIMOS DATA1 Y DATA2, PARA LOS DOS TIPOS DE ESTRUCTURA DE DATOS QUE PUEDEN RECIBIR LAS GRÁFICAS
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Energia",
        data: values1,
        backgroundColor: chartData?.included[
          chartIndex
        ]?.attributes?.content?.map((item) => {
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
    <Grid sx={{width:"100%", justifyContent:"space-around"}} container>
        <Grid item xs={9} md={8} xl={5}>
    <Box sx={{ mt: "5%", width: "100%" }}>
      <Grid container sx={{  ml:"5%", mb: 2 }}>
        {chartData.included.map((item, index) => {
          return (
            <Grid key={index} item xs={3} md={2} xl={3} sx={{ p: 1 }}>
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
      {/* <Grid item  xs={12} md={6} xl={6}> */}
      {labels1?(<Pie options={options} data={data1}/>):(<Pie options={options} data={data2}/>)}
      {/* </Grid> */}
    </Box>
    </Grid>
    <Grid item xs={5}md={5} xl={2} sx={{mt:10}}>
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
