import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles(() => ({
  title: {
    color: "#B3541E",
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h5"
            >
              Crypkart
            </Typography>

            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar/> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
