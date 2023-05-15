import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { alpha, styled } from "@mui/material/styles";
import palette from "../../../../theme/palette";
export default function ConsoleIndex({ messageList }) {
  return (
    <Paper sx={{ width: "100%", p: 2 }}>
      <Card
        sx={{ borderColor: "primary.main", border: 1, height: "20vh", p: 2 }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: "100%",
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          <li key={`${messageList[messageList.length - 1].text}`}>
            <ul>
              <ListSubheader
                sx={{ backgroundColor: `${alpha(palette.grey[300], 0.6)}` }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  <b>{`${messageList[messageList.length - 1].text}`}</b>
                </Typography>
              </ListSubheader>
              {messageList.reverse().map((item) => (
                <ListItem key={`i-${item.text}`}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {`${item.text}`}
                  </Typography>
                </ListItem>
              ))}
            </ul>
          </li>
        </List>
      </Card>
    </Paper>
  );
}
