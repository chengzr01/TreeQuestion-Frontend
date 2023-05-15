import * as React from "react";
import { useState } from "react";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import palette from "../../../../theme/palette";
import AddIcon from "@mui/icons-material/Add";

export default function IssuePanel() {
  const [studentList, setStudentList] = useState([
    "👨‍🎓 Alice",
    "👩‍🎓 Bob",
    "👩‍🎓 Carol",
    "👨‍🎓 David",
    "👨‍🎓 Eve",
  ]);
  return (
    <Paper sx={{ m: 4, p: 4 }}>
      <Typography variant="h4"> Issue </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {studentList.map((student) => {
          return (
            <Grid item xs={4}>
              <Card
                fullWidth
                sx={{
                  p: 2,
                  // backgroundColor: `${alpha(palette.primary.main, 0.2)}`,
                }}
              >
                <Typography variant="h5"> {student}</Typography>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={4}>
          <Card
            fullWidth
            sx={{
              p: 2,
            }}
          >
            <Typography variant="h5">
              <AddIcon sx={{ pt: 0.6 }} /> Add Another Student
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <Button variant="outlined">Confirm</Button>
      </Box>
    </Paper>
  );
}
