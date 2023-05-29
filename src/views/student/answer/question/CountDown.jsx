import React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function CountDown({ start, finish }) {
  const [startHandled, setStartHandled] = useState(false);
  const [finishHandled, setFinishHandled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [now, setNow] = useState(null);
  const refs = useRef(null);

  var secondsPassed = 0;
  var secondsDisplay = 0;
  var minutesDisplay = 0;

  if (startHandled && !finishHandled) {
    secondsPassed = (now - startTime) / 1000;
    secondsDisplay = secondsPassed % 60;
    minutesDisplay = secondsPassed / 60;
  } else if (finishHandled) {
    secondsPassed = (finishTime - startTime) / 1000;
    secondsDisplay = secondsPassed % 60;
    minutesDisplay = secondsPassed / 60;
  }

  useEffect(() => {
    if (!startHandled) {
      if (start) {
        setStartHandled(true);
        setStartTime(Date.now());
        setNow(Date.now());
        clearInterval(refs.current);
        refs.current = setInterval(() => {
          setNow(Date.now());
        }, 100);
      }
    }
    if (!finishHandled) {
      if (finish) {
        setFinishHandled(true);
        setFinishTime(Date.now());
        setNow(Date.now());
        clearInterval(refs.current);
      }
    }
  }, [start, finish, startHandled, finishHandled]);

  return (
    <div>
      <Typography
        fontSize={48}
        color="grey.500"
        component="div"
        sx={{ ml: 1, mr: 1 }}
      >
        {minutesDisplay.toFixed(0)}:{secondsDisplay.toFixed(0)}
      </Typography>
    </div>
  );
}
