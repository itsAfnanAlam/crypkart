import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleSearch = (e) => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles((theme) => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#B3541E",
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          CryptoCurrency Prizes by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#B3541E" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#B3541E" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: "500",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
