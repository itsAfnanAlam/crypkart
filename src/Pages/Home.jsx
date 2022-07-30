import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../Components/Banner/Banner";
import ErrorFallback from "../Components/ErrorBoundary";

const CoinsTable = React.lazy(() => import("../Components/CoinsTable"));

const Home = () => {
  return (
    <>
      <Banner />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <Suspense
          fallback={<LinearProgress style={{ backgroundColor: "#B3541E" }} />}
        >
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;
