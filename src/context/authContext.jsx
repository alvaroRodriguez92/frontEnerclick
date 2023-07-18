import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  users: null,
  errorMessage: null,
});

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("https://fakestoreapi.com/users");
      const data = await response.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  async function login(values, e) {
    console.log(values);
    e.preventDefault();
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.user,
        password: values.password,
      }),
    });
    if(response.status==200){
      const data = await response.json();
      console.log(data)
      localStorage.setItem("token",JSON.stringify(data));
      navigate("/configuracion")
    } else{
      setErrorMessage("Los datos introducidos son incorrectos")
    }
  }

  function logout() {
    setUser({ email: "", password: "" });
    localStorage.removeItem("token");
    navigate("/");
  }

  const value = {
    user,
    users,
    login,
    logout,
    errorMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
