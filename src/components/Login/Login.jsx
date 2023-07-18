import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { TextField, Box, Button, AppBar, Toolbar, Typography } from "@mui/material";

const defaultValue={user:"", password:""}

export default function Login() {
  const {login, errorMessage} = useAuthContext()
  const [inputs,setInputs] = useState(defaultValue)

  function handleInputs(e){
    setInputs((currentValue)=>({
      ...currentValue, [e.target.name]:e.target.value
    }))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Álvaro Rodriguez
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={(e)=>login(inputs,e)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "0 auto",
            paddingTop: "10%"
          }}
        ><Box sx={{pb:3, ml:"28%"}}>
          <img
            width="60%"
            src="https://asset.enerclic.es/img/icon/logo.svg"
          />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              border: "1px solid black",
              borderRadius: 2,
              boxShadow:"5px 5px 15px"
            }}
          >
            <TextField
              id="user"
              name="user"     
              type="text"        
              onChange={handleInputs}
              value={inputs.user}
              label="Usuario"
              size="medium"
              sx={{ mb: 2 }}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              onChange={handleInputs}
              value={inputs.password}
              label="Contraseña"
              size="medium"
              sx={{ mb: 2 }}
            />
            {errorMessage}
            <Button type="submit" variant="contained" sx={{ mb: 2,fontWeight:"700" }}>
              Login
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
