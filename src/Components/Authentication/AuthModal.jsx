import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { makeStyles } from "@mui/styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles(() => ({
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#16171a",
  color: "white",
  borderRadius: 10,
};
export default function AuthModal() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setAlert } = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up successfully. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#B3541E",
          color: "black",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                // textColor="primary"
                // indicatorColor="primary"
                variant="fullWidth"
                style={{ borderRadius: 84 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
