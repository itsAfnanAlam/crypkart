import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "./Carousel";

const useSyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./Img/banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useSyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginRight: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypkart
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favourite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
