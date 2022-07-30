import { makeStyles } from "@mui/styles";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid #B3541E",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#B3541E" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#B3541E",
        color: "black",
      },
      width: "22%",
    },
    "@media (max-width: 600px)":{
      selectButton:{ 
        margin: 5,
        padding: 5,
        width: "40%"
      }
    }
  });

  const classes = useStyles();

  return (
    <span className={classes.selectButton} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
