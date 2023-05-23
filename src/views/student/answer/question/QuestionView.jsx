import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import SubmitDialog from "./SubmitDialog";
import SkipDialog from "./SkipDialog";

export default function QuestionView({
  id,
  stem,
  options,
  handleSubmit,
  handleSkip,
}) {
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [choice, setChoice] = useState();
  // options.map((option) => {
  //   return { choice: option, result: false };
  // })

  const handleClickSubmit = (event) => {
    event.preventDefault();
    setSubmitDialogOpen(true);
  };

  const handleClickSkip = (event) => {
    event.preventDefault();
    setSkipDialogOpen(true);
  };

  const handleStart = (event) => {
    console.log("start");
  };

  const handleEnd = (event) => {
    console.log("end");
  };

  return (
    <Paper sx={{ width: "100%", p: 2, height: "60vh" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={10}
            display={"flex"}
            justifyContent={"left"}
            alignContent={"left"}
          >
            <Typography variant="body" color="grey.500" component="div">
              Question ID: {id}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Button
              variant="outlined"
              onClick={(event) => {
                handleStart();
              }}
            >
              Start
            </Button>
          </Grid>
          <Grid
            item
            xs={1}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={(event) => {
                handleEnd();
              }}
            >
              End
            </Button>
          </Grid>
        </Grid>

        <Typography sx={{ fontSize: 18 }} component="div">
          <b>{stem}</b>
        </Typography>
        {/* {options.map((option) => {
          return (
            <OptionCard
              option={option}
              choice={choice}
              setChoice={setChoice}
            ></OptionCard>
          );
        })} */}
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="small"
              variant="outlined"
              onClick={(event) => {
                handleClickSubmit(event);
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="small"
              variant="outlined"
              onClick={(event) => {
                handleClickSkip(event);
              }}
            >
              Skip
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <SubmitDialog
        open={submitDialogOpen}
        setOpen={setSubmitDialogOpen}
        handleSubmit={handleSubmit}
      />
      <SkipDialog
        open={skipDialogOpen}
        setOpen={setSkipDialogOpen}
        handleSkip={handleSkip}
      />
    </Paper>
  );
}
