import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Button, Grid } from "@mui/material";
import cookie from "react-cookies";
import axios from "axios";
import TreeCard from "./TreeCard";

export default function ManageIndex() {
  const [treeList, setTreeList] = useState([]);
  const [treeListLoad, setTreeListLoad] = useState(false);

  const getTreeList = () => {
    setTreeListLoad(true);
    var body = { name: cookie.load("name"), role: cookie.load("role") };
    axios
      .post("/tree/read_tree", body)
      .then((res) => {
        setTreeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!treeListLoad) {
      getTreeList();
    }
  });

  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Grid container spacing={2}>
        {treeList.map((tree) => {
          return (
            <Grid item xs={4}>
              <TreeCard tree={tree} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
