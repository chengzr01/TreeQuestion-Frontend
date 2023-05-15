import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ReviewTable from "./ReviewTable";
import Typography from "@mui/material/Typography";

export default function ReviewTreeCard({ id, teacher, grade }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        "&:hover": {
          backgroundColor: "grey.200",
          opacity: [0.75, 0.75, 0.75],
        },
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tree ID. {id}
        </Typography>
        <Typography variant="h4" component="div">
          Grade: {grade}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Teacher: {teacher}
        </Typography>
        <ReviewTable />
      </CardContent>
    </Card>
  );
}
