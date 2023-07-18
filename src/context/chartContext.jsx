import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const ChartContext = createContext({
  fetchApi: () => {},
  chartData:null,
  loading:null,
});

export default function ChartContextProvider({ children }) {

  //Navigate para la función de redireccion de react-router-dom
  const navigate = useNavigate();

  //Creamos chartdata para almacenar los datos que vienen de la api de energia
  const [chartData, setChartData] = useState([]);
  
  //Definimos loading para crear un spinner
  const [loading, setLoading] = useState(false);


  //Llamamamos a la api de energia
   async function fetchApi (e, lang,category,widget, dateStart,dateEnd,time) {
    e.preventDefault()
    if(!lang||!category||!widget||!dateStart||!dateEnd||!time){
        alert("Hay que rellenar todos los campos")
    } else{
     setLoading(true) 
    const response = await fetch(`https://apidatos.ree.es/${lang}/datos/${category}/${widget}?start_date=${dateStart}&end_date=${dateEnd}&time_trunc=${time}
  `)
  if(response.status==200){
      const data = await response.json()
      setChartData(data)
      navigate("/home")
      setLoading(false)

  } else{
    alert("Peticion incorrecta, por favor seleccione unos datos válidos")
    setLoading(false)
  }
    }
  
}

  //Definimos los values que usaremos de nuestro context
  const value = {
    chartData,
    fetchApi,
    loading
  };

  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
}

export function useChartContext() {
  return useContext(ChartContext);
}
