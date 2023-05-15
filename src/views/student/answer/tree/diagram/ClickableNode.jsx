import { Card, Paper, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import Grid from "@mui/material/Grid";
import { alpha, styled } from "@mui/material/styles";
import palette from "../../../../../theme/palette";
import { useState } from "react";

const STATE = { INACTIVE: 0, ACTIVE: 1, CORRECT: 2, WRONG: 3 };

export default function ClickableNode({ data, isConnectable }) {
  const getTextShow = () => {
    return <Typography variant="body">{data.label}</Typography>;
  };
  const getBackgroundColor = () => {
    if (data.state === STATE.INACTIVE) {
      return `${alpha(palette.grey[300], 0.6)}`;
    } else if (data.state === STATE.ACTIVE) {
      return `${alpha(palette.info.main, 0.6)}`;
    } else if (data.state === STATE.CORRECT) {
      return `${alpha(palette.primary.main, 0.6)}`;
    } else if (data.state === STATE.WRONG) {
      return `${alpha(palette.error.main, 0.6)}`;
    }
  };
  return (
    <div
      className="clickable-node"
      style={{
        minWidth: "10vw",
        minHeight: "5vh",
        borderWidth: "0.5",
        borderColor: "black",
        backgroundColor: getBackgroundColor(),
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <Paper
          sx={{
            p: 1,
            backgroundColor: `${alpha("#FFFFFF", 0)}`,
          }}
        >
          <Grid container>
            <Grid
              item
              flex="display"
              justifyContent="center"
              alignContent="center"
              xs={12}
            >
              {getTextShow()}
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
