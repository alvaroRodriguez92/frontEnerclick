import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  users: null,
  errorMessage: null,
  isLogged: null,
});

export default function AuthContextProvider({ children }) {
  //Inicializamos navigate para poder darle uso al sistema de navegacion de react-router-dom
  const navigate = useNavigate();

  //Definimos usuarios
  const [users, setUsers] = useState([]);

  //Defino una variable para permitir la navegacion a rutas privadas
  const [activarNavigate, setActivarNavigate] = useState(null);

  //Definimos variable para saber si un usuario se encuentra logueado o no
  const [isLogged, setIsLogged] = useState(false)

  //Definimos mensaje de error para el formulario de login
  const [errorMessage, setErrorMessage] = useState("");

  //Nos traemos todos los usuarios por si hiciese falta
  useEffect(() => {
    async function getUsers() {
      const response = await fetch("https://fakestoreapi.com/users");
      const data = await response.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  //Definimos nuestra funcion de login que devolverá un token que almacenaremos en el localStorage, y nos redireccionará al 
  //apartado de configuracion
  async function login(values, e) {
    e.preventDefault();
    console.log(isLogged)
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.user,
        password: values.password,
      }),
    });
    if (response.status == 200) {
      const data = await response.json();
      localStorage.setItem("token", JSON.stringify(data));
      setActivarNavigate(true)
      const token = localStorage.getItem("token");
      navigate("/configuracion")
    } else {
      
      setErrorMessage("Los datos introducidos son incorrectos");
    }
  }

  //Logout que eliminará el token del local storage y nos devolverá a la pagina de inicio
  function logout() {
    localStorage.removeItem("token");
    console.log(isLogged)
    navigate("/");
  }

  //Definimos los values que usaremos de nuestro context
  const value = {
    users,
    login,
    logout,
    errorMessage,
    isLogged
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
