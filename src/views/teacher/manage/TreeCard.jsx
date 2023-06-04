import * as React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Tooltip,
  Grid,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import IssueDialog from "./IssueDialog";

export default function TreeCard({ tree }) {
  const [open, setOpen] = React.useState(false);

  const handleIssueDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Card>
      <IssueDialog open={open} setOpen={setOpen} tree={tree} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tree
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          # Node: {tree.nodes.length}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          # Edge: {tree.edges.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Tooltip title="Delete">
              <Button>
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Issue">
              <Button>
                <ShareIcon
                  onClick={(event) => {
                    handleIssueDialogOpen(event);
                  }}
                />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
