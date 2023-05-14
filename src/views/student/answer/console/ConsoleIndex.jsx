import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

export default function ConsoleIndex() {
  const [messageList, setMessageList] = useState([
    "Question 0: You are right!",
    "Question 1: You are wrong!",
    "Question 2: You are wrong!",
    "Question 3: You are wrong!",
    "Question 4: You are wrong!",
    "Question 5: You are wrong!",
    "Question 6: You are wrong!",
    "Question 7: You are wrong!",
    "Question 8: You are wrong!",
    "Question 9: You are wrong!",
    "Question 10: You are wrong!",
  ]);
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
          <li key={`${messageList[messageList.length - 1]}`}>
            <ul>
              <ListSubheader>{`${
                messageList[messageList.length - 1]
              }`}</ListSubheader>
              {messageList.reverse().map((item) => (
                <ListItem key={`i-${item}`}>
                  <ListItemText primary={`${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        </List>
      </Card>
    </Paper>
  );
}
