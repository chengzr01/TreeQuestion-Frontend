import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TreeCard({
  name,
  teacher,
  field,
  concepts,
  setSelectedName,
}) {
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
          ACTIVE
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Teacher: {teacher}
        </Typography>
        <Typography variant="body2">
          Field: {field}
          <br />
          Concepts:{" "}
          {concepts.map((concept) => {
            return "[" + concept + "] ";
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setSelectedName(name);
          }}
        >
          Select
        </Button>
        <Button
          onClick={() => {
            setSelectedName("None");
          }}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
