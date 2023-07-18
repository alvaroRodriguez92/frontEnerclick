import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const ChartContext = createContext({
  fetchApi: () => {},
  chartData:null,
  errorMessage: null,
  loading:null,
});

export default function ChartContextProvider({ children }) {
  const [chartData, setChartData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



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
      console.log(chartData)
      navigate("/home")
      setLoading(false)

  } else{
    alert("Peticion incorrecta, por favor seleccione unos datos válidos")
    setLoading(false)
  }
    }
  
}
  const value = {
    chartData,
    fetchApi,
    errorMessage,
    loading
  };

  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
}

export function useChartContext() {
  return useContext(ChartContext);
}
