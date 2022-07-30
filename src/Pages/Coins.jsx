import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";
import { Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../Components/Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Coins = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginTop: 20,
      fontFamily: "Montserrat",
    },
    description: {
      wdith: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
    },

    // Responsive styles

    "@media(max-width:900px)": {
      container: {
        flexDirection: "column",
        alignItems: "center",
      },
      sidebar: {
        width: "100%",
      },
      marketData: {
        display: "flex",
        justifyContent: "space-around",
      },
    },
    "@media(max-width:600px)": {
      marketData: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    "@media(max-width:0px)": {
      marketData: {
        alignItems: "start",
      },
    },
  }));

  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed to watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "#B3541E" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                marginTop: 10,
                color: "black",
                backgroundColor: inWatchList ? "#ff0000" : "#B3541E",
              }}
              onClick={inWatchList ? removeFromWatchList : addToWatchList}
            >
              {inWatchList ? "Remove from watchlist" : "Add to WatchList"}
            </Button>
          )}
        </div>
      </div>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coins;
