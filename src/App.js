import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import { makeStyles } from "@mui/styles";
import Alert from "./Components/Alert";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const Home = lazy(() => import("./Pages/Home"));
const Coins = lazy(() => import("./Pages/Coins"));

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Suspense
          fallback={<LinearProgress style={{ backgroundColor: "#B3541E" }} />}
        >
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/coins/:id" element={<Coins />} />
          </Routes>
        </Suspense>
      </div>
      <Alert />
    </Router>
  );
}

export default App;
