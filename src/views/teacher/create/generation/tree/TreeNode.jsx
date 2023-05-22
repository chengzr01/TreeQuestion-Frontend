import React from "react";
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Slide,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import palette from "../../../../../theme/palette";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TreeNode({ data, isConnectable }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getBackgroundColor = () => {
    if (data.level === "Remember") return `${alpha(palette.primary.main, 0.1)}`;
    else if (data.level === "Understand")
      return `${alpha(palette.primary.main, 0.21)}`;
    else if (data.level === "Apply")
      return `${alpha(palette.primary.main, 0.35)}`;
    else if (data.level === "Analyze")
      return `${alpha(palette.primary.main, 0.52)}`;
    else if (data.level === "Evaluate")
      return `${alpha(palette.primary.main, 0.73)}`;
    else if (data.level === "Create")
      return `${alpha(palette.primary.main, 1.0)}`;
  };
  return (
    <div
      className="tree-node"
      style={{
        minWidth: "10vw",
        minHeight: "5vh",
        borderWidth: "0.5",
        borderColor: "black",
        backgroundColor: getBackgroundColor(),
      }}
    >
      <Dialog open={modifyOpen} TransitionComponent={Transition} keepMounted>
        <DialogTitle>{"View Question"}</DialogTitle>
        <DialogContent sx={{ p: 1, width: "100%" }}>
          <Box
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  ID
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  gutterBottom
                  display="flex"
                  justifyContent="left"
                  alignContent="left"
                >
                  {data.id}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  Stem
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  gutterBottom
                  display="flex"
                  justifyContent="left"
                  alignContent="left"
                >
                  {data.stem}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  Options
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  gutterBottom
                  display="flex"
                  justifyContent="left"
                  alignContent="left"
                >
                  {data.options}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                  display="flex"
                  justifyContent="right"
                  alignContent="right"
                >
                  Answer
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  gutterBottom
                  display="flex"
                  justifyContent="left"
                  alignContent="left"
                >
                  {data.answer}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModifyOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ minWidth: "10vw" }}
          onClick={() => {
            handleClose();
            setModifyOpen(true);
          }}
        >
          View
        </MenuItem>
      </Menu>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>
        <Typography onClick={handleClick} sx={{ p: 1 }}>
          <strong>#{data.id}</strong> {data.concept}
        </Typography>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
