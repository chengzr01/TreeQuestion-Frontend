import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CountDown() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [start, setStart] = useState(false);
  const refs = useRef(null);
  var secondsPassed = 0;
  var secondsDisplay = 0;
  var minutesDisplay = 0;

  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
    secondsDisplay = secondsPassed % 60;
    minutesDisplay = secondsPassed / 60;
  }

  function handleStart() {
    setStart(true);
    setStartTime(Date.now());
    setNow(Date.now());
    clearInterval(refs.current);
    refs.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  useEffect(() => {
    if (!start) {
      handleStart();
    }
  });

  return (
    <div>
      <Typography
        variant="body"
        color="grey.500"
        component="div"
        sx={{ ml: 1, mr: 1 }}
      >
        {minutesDisplay.toFixed(0)}:{secondsDisplay.toFixed(0)}
      </Typography>
    </div>
  );
}
