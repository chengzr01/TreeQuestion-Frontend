import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ReviewTreeCard from "./ReviewTreeCard";

export default function ReviewIndex() {
  const [historicalTreeList, setHistoricalTreeList] = useState([]);
  const [historicalTreeListLoad, setHistoricalTreeListLoad] = useState(false);
  const getHistoricalTreeList = () => {
    setHistoricalTreeListLoad(true);
    setHistoricalTreeList([
      { id: "1", teacher: "A", grade: "90" },
      { id: "2", teacher: "B", grade: "85" },
      { id: "3", teacher: "C", grade: "80" },
      { id: "4", teacher: "D", grade: "95" },
    ]);
  };
  useEffect(() => {
    if (!historicalTreeListLoad) {
      getHistoricalTreeList();
    }
  });
  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Grid container spacing={2}>
        {historicalTreeList.map((item) => {
          return (
            <Grid item xs={4}>
              <ReviewTreeCard
                id={item.id}
                teacher={item.teacher}
                grade={item.grade}
              ></ReviewTreeCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
