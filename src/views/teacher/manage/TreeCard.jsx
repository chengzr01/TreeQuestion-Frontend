import * as React from "react";
import cookie from "react-cookies";
import axios from "axios";
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

export default function TreeCard({ tree, treeListLoad, setTreeListLoad }) {
  const [open, setOpen] = React.useState(false);

  const handleIssueDialogOpen = () => {
    setOpen(true);
  };

  const handleDelete = (event) => {
    var body = {
      name: cookie.load("name"),
      role: cookie.load("role"),
      identifier: tree.identifier,
      description: tree.description,
    };
    axios
      .post("/tree/delete_tree", body)
      .then((res) => {
        console.log(res.data.data);
        setTreeListLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <IssueDialog open={open} setOpen={setOpen} tree={tree} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {tree.identifier}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          # Node: {tree.description.nodes.length}
          <br /># Edge: {tree.description.edges.length}
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
              <Button
                onClick={(event) => {
                  handleDelete(event);
                }}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Issue">
              <Button
                onClick={(event) => {
                  handleIssueDialogOpen(event);
                }}
              >
                <ShareIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
