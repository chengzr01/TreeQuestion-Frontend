import React from "react";
import { useState } from "react";
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from "reactflow";
import { alpha } from "@mui/material/styles";
import {
  Button,
  Typography,
  Menu,
  MenuItem,
  Slide,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import palette from "../../../../theme/palette";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = { label: "Edge" },
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [edgeName, setEdgeName] = useState(data.label);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <Dialog open={modifyOpen} TransitionComponent={Transition} keepMounted>
        <DialogTitle>{"Modify Edge"}</DialogTitle>
        <DialogContent>
          <input
            multiline
            value={edgeName}
            onChange={(evt) => setEdgeName(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModifyOpen(false);
              data.update(id, edgeName);
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
          onClick={() => {
            handleClose();
            setModifyOpen(true);
          }}
        >
          Modify
        </MenuItem>
      </Menu>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: `${alpha(palette.primary.main, 0.6)}`,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            pointerEvents: "all",
          }}
          onClick={handleClick}
          className="nodrag nopan"
        >
          <Typography>{edgeName}</Typography>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
