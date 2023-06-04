import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { getNodeList } from "../question/Utils";

export default function TreeCard({ tree, setActiveTree, setAnswerList }) {
  const handleSelectTree = (event) => {
    var tempActiveTree = getNodeList(tree);
    var tempAnswerList = tempActiveTree.map((node) => {
      var optionList = node.options.map((option) => {
        return { option: option, result: false };
      });
      return { id: node.id, options: optionList };
    });
    setActiveTree(tempActiveTree);
    setAnswerList(tempAnswerList);
  };
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
        <Typography variant="h5" component="div">
          TREE
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={(event) => {
            handleSelectTree(event);
          }}
        >
          Select
        </Button>
      </CardActions>
    </Card>
  );
}
